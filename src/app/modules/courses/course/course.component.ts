import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Course} from '../../../entities/course';

@Component({
  selector: 'course',
  template: require('./course.component.html'),
  styles: [require('./course.styles.scss')],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
  @Input() public course: Course;
  @Output() public onDelete = new EventEmitter();

  constructor() {
  }

  public doEdit() {
    console.log('doEdit', this.course);
  }

  public doDelete() {
    console.log('doDelete', this.course);
    this.onDelete.emit(this.course);
  }

  public calculateStatusClass(status): string {
    return 'open';
  }
}
