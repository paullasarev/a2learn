import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
//import { Subscription } from 'rxjs';

import {Course} from '../../entities/course';
// import { TodoService } from '../../core/services';

@Component({
  selector: 'courses',
  encapsulation: ViewEncapsulation.None,
  providers: [],
  styles: [require('./courses.styles.scss')],
  template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {
  // private todoServiceSubscription: Subscription;
  private courses: Course[];
  // private isLoading: boolean = false;

  constructor() {
    console.log('courses page constructor');

    this.courses = [
      new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600),
      new Course( '2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    ];
  }

  public ngOnInit() {
    console.log('Courses page init');

    //this.isLoading = true;
    // this.todoServiceSubscription = this.todoService.getTodoItems().subscribe((res: TodoItem[]) => {
    //   this.todoList = res;
    //   this.isLoading = false;
    // });
  }

  public ngOnDestroy() {
    // this.todoServiceSubscription.unsubscribe();
  }

  public onDelete(course) {
    console.log('couses.onDelete', course);
  }
}
