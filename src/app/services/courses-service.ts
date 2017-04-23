import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Http, Response, URLSearchParams } from '@angular/http';
import { find, remove, clone, each, map } from 'lodash';
import { Router } from '@angular/router';

import { Course, Courses, Filter }  from "../entities/course";
import { Authors, Author }  from "../entities/author";
import { LoadBlockService } from '../services/load-block';
import { AuthorizedHttp } from '../services/authorized-http';

@Injectable()
export class CoursesService {
  private apiUrl = "/api/courses";

  private filter: Filter = {start: 0, count: 100, query:"", sort:"date", reverse: false};

  private listRequests: Subject<Filter>;
  private list$: Observable<Courses>;

  private itemRequests: Subject<string>;
  private item$: Observable<Course>;

  constructor(
    private http: AuthorizedHttp,
    private router: Router,
    private loadBlockService: LoadBlockService,
  ) {
    this.listRequests = new Subject<Filter>();
    this.list$ = this.listRequests
      // .debounceTime(300)
      .do(()=>{this.loadBlockService.show()})
      .switchMap(this.getList.bind(this))
      .do(()=>{this.loadBlockService.hide()})
      .share()
    ;

    this.itemRequests = new Subject<string>();
    this.item$ = this.itemRequests
      // .debounceTime(300)
      .do(()=>{this.loadBlockService.show()})
      .switchMap(this.getItem.bind(this))
      .do(()=>{this.loadBlockService.hide()})
      .share()
      ;

    //keep at least one observer
    this.list$.subscribe(()=>{});
    this.item$.subscribe(()=>{});
  }

  private getList(filter: Filter): Observable<Courses> {
    let params = new URLSearchParams();
    params.set('start', filter.start.toString());
    params.set('count', filter.count.toString());
    params.set('query', filter.query);
    params.set('sort', filter.sort);
    params.set('reverse', filter.reverse.toString());
    return this.http.get(this.apiUrl, {search: params})
      .map(this.extractCourses.bind(this))
    ;
  }

  private extractCourses(response: Response): Courses {
    let body = response.json();
    return map<any, Course>(body, this.extractCourse.bind(this));
  }

  private extractCourse(item: any): Course {
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

  private encodeCourse(course: Course): any {
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

  public askList(filter: Filter) : void {
    this.filter = filter;
    this.listRequests.next(filter);
  }

  public get list() : Observable<Courses> {
    return this.list$;
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

  public askItem(id: string) : void {
    this.itemRequests.next(id);
  }

  public get item() : Observable<Course> {
    return this.item$;
  }

  public removeItem(id: string) : Promise<boolean> {
    this.loadBlockService.show();
    return this.http
      .delete(this.apiUrl + '/' + id)
      .toPromise()
      .then((response: Response) => {
        this.loadBlockService.hide();
        this.listRequests.next(this.filter);
        return true;
      })
      .catch((error) => {
        this.loadBlockService.hide();
        this.router.navigate(['error', (error && error.message)]);
        return false;
      })
  }

  public saveItem(course: Course): Promise<boolean> {
    this.loadBlockService.show();
    return this.http
      .put(this.apiUrl + '/' + course.id, this.encodeCourse(course))
      .toPromise()
      .then((response: Response) => {
        this.listRequests.next(this.filter);
        return true;
      })
      .catch((response: Response) => {
        this.router.navigate(['error', this.getStatus(course.id, response)]);
        return false;
      })
      .then((result)=>{
        this.loadBlockService.hide();
        return result;
      })
  }

  public newItem(course: Course): Promise<Course> {
    this.loadBlockService.show();
    return this.http
      .post(this.apiUrl, this.encodeCourse(course))
      .toPromise()
      .then((response: Response) => {
        this.listRequests.next(this.filter);
        return response.json();
      })
      .then(this.extractCourse.bind(this))
      .catch((response: Response) => {
        this.router.navigate(['error', this.getStatus('new', response)]);
        return null;
      })
      .then((result)=>{
        this.loadBlockService.hide();
        return result;
      })
  }


}
