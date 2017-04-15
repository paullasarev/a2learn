import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Http, Response, URLSearchParams } from '@angular/http';
import { find, remove, clone, each, map } from 'lodash';
import { Router } from '@angular/router';

import { Course, Courses, Filter }  from "../entities/course";
import { LoadBlockService } from '../services/load-block';


@Injectable()
export class CoursesService {
  private data: Courses;
  private lastId: number;
  private apiUrl = "/api/courses";

  private filter: Filter = {start: 0, count: 100, query:"", sort:"date"};

  private listRequests: Subject<Filter>;
  private list$: Observable<Courses>;

  private itemRequests: Subject<string>;
  private item$: Observable<Course>;

  constructor(
    private http: Http,
    private router: Router,
    private loadBlockService: LoadBlockService,
  ) {
    this.data = [
      new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600, true),
      new Course('2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    ];

    this.lastId = 100;

    this.listRequests = new Subject<Filter>();
    this.list$ = this.listRequests
      .debounceTime(300)
      .do(()=>{this.loadBlockService.hide()})
      .switchMap(this.getList.bind(this))
      .do(()=>{this.loadBlockService.hide()})
      .share()
    ;

    this.itemRequests = new Subject<string>();
    this.item$ = this.itemRequests
      .debounceTime(300)
      .do(()=>{this.loadBlockService.hide()})
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
      new Date(item.date)
    );
  }

  private encodeCourse(course: Course): any {
    return {
      "id": course.id,
      "name": course.title,
      "description": course.description,
      "isTopRated": course.topRated,
      "date": course.creatingDate,
      "length": course.duration
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

    return this.http.get(this.apiUrl + '/' + id)
      .map((response: Response) => response.json())
      .map(this.extractCourse.bind(this))
      .catch((error) => {
        this.router.navigate(['error', (error && error.message)]);
        return Observable.of(new Course());
      })
    ;
  }

  public askItem(id: string) : void {
    this.itemRequests.next(id);
  }

  public get item() : Observable<Course> {
    return this.item$;
  }

  public removeItem(id: string) : void {
    this.loadBlockService.show();
    this.http.delete(this.apiUrl + '/' + id)
      .toPromise()
      .then((response: Response) => {
        this.loadBlockService.hide();
         this.listRequests.next(this.filter);
      })
      .catch((error) => {
        this.loadBlockService.hide();
        this.router.navigate(['error', (error && error.message)]);
      })
  }

  public saveItem(course: Course) {
    this.loadBlockService.show();
    this.http.put(this.apiUrl + '/' + course.id, this.encodeCourse(course))
      .toPromise()
      .then((response: Response) => {
        this.loadBlockService.hide();
         this.listRequests.next(this.filter);
      })
      .catch((error) => {
        this.loadBlockService.hide();
        this.router.navigate(['error', (error && error.message)]);
      })
  }

}
