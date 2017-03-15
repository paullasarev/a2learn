import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {find, remove} from 'lodash';

import {Course, Courses}  from "../entities/course";

@Injectable()
export class CoursesService {
  private data: Courses;
  private lastId: number;

  private listRequests: Subject<string>;
  private list$: Observable<Courses>;

  private itemRequests: Subject<string>;
  private item$: Observable<Course>;

  constructor() {
    console.log('CoursesService.constructor');
    this.data = [
      new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600),
      new Course('2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    ];

    this.lastId = 100;

    this.listRequests = new Subject<string>();
    this.list$ = this.listRequests
      .flatMap(this.getList.bind(this))
      .debounceTime(300);

    this.itemRequests = new Subject<string>();
    this.item$ = this.itemRequests
      .flatMap(this.getItem.bind(this))
      .debounceTime(300)
      ;
  }

  public getList(filter) {
    return Observable.of(this.data)
      .delay(700);
  }

  public askList(filter?: string) : void {
    this.listRequests.next(filter);
  }

  public get list() : Observable<Courses> {
    return this.list$;
  }

  public getItem(id) {
    if (!id) {
      return Observable.of(new Course("", "Course", "New course", 120));
    }

    let item = find(this.data, {id:id});
    if (!item) {
      throw new Error(`no course with id=${id}`);
    }

    return Observable.of(item)
      .delay(600);
  }

  public askItem(id: string) : void {
    this.itemRequests.next(id);
  }

  public get item() : Observable<Course> {
    return this.item$;
  }

  public removeItem(id: string) : void {
    let item = find(this.data, {id:id});
    if (!item) {
      throw new Error(`no course with id=${id}`);
    }
    remove(this.data, {id:id});
    this.listRequests.next("");    
  }

  public saveItem(course: Course) {
    if (!course.id) {
      this.lastId++;
      course.id = this.lastId.toString();
    }

    let item = find(this.data, {id: course.id});
    if (item) {
      Object.assign(item, course);
    } else {
      this.data.push(course);
      this.listRequests.next("");    
    }

  }

}
