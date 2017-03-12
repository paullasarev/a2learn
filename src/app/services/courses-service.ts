import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {find} from 'lodash';

import {Course, Courses}  from "../entities/course";

@Injectable()
export class CoursesService {
  private data: Courses;

  private listRequests: Subject<string>;
  private list$: Observable<Courses>;

  private itemRequests: Subject<string>;
  private item$: Observable<Course>;

  constructor() {
    this.data = [
      new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600),
      new Course('2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    ];

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
    console.log('CoursesService.getList', filter)
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
    console.log('CoursesService.getItem', id)
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
    console.log('CoursesService.askItem', id)
    this.itemRequests.next(id);
  }

  public get item() : Observable<Course> {
    return this.item$;
  }
}
