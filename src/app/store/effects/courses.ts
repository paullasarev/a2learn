import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { find, remove, clone, each, map } from 'lodash';

import { LoadBlockService } from '../../services/load-block';
import { Course, Courses, Filter }  from "../../entities/course";
import { Authors, Author }  from "../../entities/author";
import { ActionTypes, GetListAction, GetItemAction,
   UpdateListAction, UpdateItemAction, SaveItemAction,
   NewItemAction, RemoveItemAction }  from '../actions/courses';
import { Store } from '@ngrx/store';
import { AppState, selector } from '../../store/store';
import { CoursesState } from '../../store/reducers/courses';

@Injectable()
export class CoursesEffects {

  public apiUrl = "/api/courses";

  constructor(
    private http: Http,
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private loadBlockService: LoadBlockService,
  ) {}

  @Effect() list$ = this.actions$
    .ofType(ActionTypes.GET_LIST)
    .map( (action: GetListAction) => (action.payload) )
    .do(()=>{this.loadBlockService.show()})
    .switchMap(this.getList.bind(this))
    .do(()=>{this.loadBlockService.hide()})
    .map((courses:Courses)=>new UpdateListAction(courses))
  ;

  @Effect() item$ = this.actions$
    .ofType(ActionTypes.GET_ITEM)
    .map( (action: GetItemAction) => (action.payload) )
    .do(()=>{this.loadBlockService.show()})
    .switchMap(this.getItem.bind(this))
    .do(()=>{this.loadBlockService.hide()})
    .map((course:Course)=>new UpdateItemAction(course))
   ;

  @Effect() save$ = this.actions$
    .ofType(ActionTypes.SAVE_ITEM)
    .map( (action: SaveItemAction) => (action.payload) )
    .do(()=>{this.loadBlockService.show()})
    .switchMap(this.saveItem.bind(this))
    .do(()=>{this.loadBlockService.hide()})
    .withLatestFrom<Response,  CoursesState>(this.store.select(selector.courses))
    .map(([response, state]) => {
      return new GetListAction(state.filter);
    })
  ;

  @Effect() new$ = this.actions$
    .ofType(ActionTypes.NEW_ITEM)
    .map( (action: NewItemAction) => (action.payload) )
    .do(()=>{this.loadBlockService.show()})
    .switchMap(this.newItem.bind(this))
    .do(()=>{this.loadBlockService.hide()})
    .map((response: Response) => {
      let course = response.json();
      this.router.navigate(['courses', course.id], {replaceUrl: true});
      return {type: 'NO_ACTION'};
    })
  ;

  @Effect() remove$ = this.actions$
    .ofType(ActionTypes.REMOVE_ITEM)
    .map( (action: RemoveItemAction) => (action.payload) )
    .do(()=>{this.loadBlockService.show()})
    .switchMap(this.removeItem.bind(this))
    .do(()=>{this.loadBlockService.hide()})
    .withLatestFrom<Response,  CoursesState>(this.store.select(selector.courses))
    .map(([response, state]) => {
      return new GetListAction(state.filter);
    })
  ;

  private getList(filter: Filter): Observable<Courses> {
    let params = new URLSearchParams();
    params.set('start', filter.start.toString());
    params.set('count', filter.count.toString());
    params.set('query', filter.query);
    params.set('sort', filter.sort);
    params.set('reverse', filter.reverse.toString());
    return this.http
      .get(this.apiUrl, {search: params})
      .map(this.extractCourses.bind(this))
    ;
  }

  public getItem(id): Observable<Course> {
    if (!id) {
      return Observable.of(new Course("", "Course", "New course", 120));
    }

    return this.http
      .get(this.apiUrl + '/' + id)
      .map((response: Response) => response.json())
      .map(this.extractCourse.bind(this))
      .catch((response: Response) => {
        this.router.navigate(['error', this.getStatus(id, response)], {replaceUrl: true});
        return Observable.of(new Course());
      })
    ;
  }

  private getStatus(id: string, response: Response): string {
    return 'Course ' + id + ': ' + response.statusText + ' ('  + response.status + ')';
  }

  public extractCourses(response: Response): Courses {
    let body = response.json();
    return map<any, Course>(body, this.extractCourse.bind(this));
  }

  public extractCourse(item: any): Course {
    return new Course(
      item.id,
      item.name,
      item.description,
      item.length,
      item.isTopRated,
      new Date(item.date),
      map(item.authors, (item:any)=> new Author(item.id, item.firstName, item.lastName))
    );
  }

  public encodeCourse(course: Course): any {
    return {
      "id": course.id,
      "name": course.title,
      "description": course.description,
      "isTopRated": course.topRated,
      "date": course.creatingDate,
      "length": course.duration,
      "authors": course.authors,
    }
  }

  public saveItem(course: Course): Observable<Response> {
    return this.http
      .put(this.apiUrl + '/' + course.id, this.encodeCourse(course))
      .catch((response: Response) => {
        this.router.navigate(['error', this.getStatus(course.id, response)]);
        return Observable.of(null);
      })
  }

  public newItem(course: Course): Observable<Response> {
    return this.http
      .post(this.apiUrl, this.encodeCourse(course))
      .catch((response: Response) => {
        this.router.navigate(['error', this.getStatus("new", response)]);
        return Observable.of(null);
      })
  }

  public removeItem(id: string): Observable<Response> {
    return this.http
      .delete(this.apiUrl + '/' + id)
      .catch((response: Response) => {
        this.router.navigate(['error', this.getStatus("remove", response)]);
        return Observable.of(null);
      })
  }

}
