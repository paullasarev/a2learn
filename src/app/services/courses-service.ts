import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

import {Course, Courses}  from "../entities/course";

@Injectable()
export class CoursesService {
  private coursesData: Courses;
  private requests: Subject<string>;
  private courses$: Observable<Courses>;

  constructor() {
    this.coursesData = [
      new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600),
      new Course( '2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    ];

    this.requests = new Subject<string>();

    this.courses$ = this.requests.flatMap((filter) => {
      console.log('service.filter', filter)
      return Observable.of(this.coursesData)
        .delay(700);
    }).debounceTime(300);
  }

  public ask(filter?: string) : void {
    this.requests.next(filter);
  }

  public get courses() : Observable<Courses> {
    return this.courses$;
  }
}
