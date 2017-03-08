import {Component, ViewEncapsulation, Input} from '@angular/core';
import {Course} from '../../../entities/course';
// import { todoStatusClasses } from '../../../core/enums';

@Component({
  selector: 'course',
  template: require('./course.component.html'),
  styles: [require('./course.styles.scss')],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
  // @Input() public todo: TodoItem;
  @Input() public course: Course;

  constructor() {
  }

  public calculateStatusClass(status): string {
    //return todoStatusClasses[status];
    return 'open';
  }
}
