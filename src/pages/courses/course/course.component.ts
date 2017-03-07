import { Component, ViewEncapsulation, Input } from '@angular/core';
import {Course} from '../../../entities/course';
// import { TodoItem } from '../../../core/entities';
// import { todoStatusClasses } from '../../../core/enums';

@Component({
  selector: 'course',
  templateUrl: 'course.component.html',
  styles: [require('./course.styles.scss')],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
  // @Input() public todo: TodoItem;
  public course: Course;

  constructor() {
  }

  public calculateStatusClass(status): string {
    //return todoStatusClasses[status];
    return 'open';
  }
}
