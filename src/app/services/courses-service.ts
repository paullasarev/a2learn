import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";

import {Course, Courses}  from "../entities/course";

@Injectable()
export class CoursesService {
  private coursesData: Courses;
  private coursesObserver: Subscriber<Courses>;
  private source_: Observable<Courses>;

  constructor() {
    this.coursesData = [
      new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600),
      new Course( '2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    ];

    this.source_ = Observable.create((observer:Subscriber<Courses>)=>{
      this.coursesObserver = observer;
    })
  }

  public start(filter?: string) : void {
    window.setTimeout(()=>{
      this.coursesObserver.next(this.coursesData);
    }, 500);
  }

  public get source() : Observable<Courses> {
    return this.source_;
  }
}
