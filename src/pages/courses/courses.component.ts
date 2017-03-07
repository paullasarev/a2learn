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
  private isLoading: boolean = false;

  constructor() {
    console.log('courses page constructor');

    this.courses = [new Course('javascript', 'js basic'), new Course('CSS', 'CSS basic')];
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
}
