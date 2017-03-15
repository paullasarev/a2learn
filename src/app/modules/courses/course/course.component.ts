import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Course} from '../../../entities/course';
import { Router } from '@angular/router';

@Component({
  selector: 'course',
  template: require('./course.component.html'),
  styles: [require('./course.styles.scss')],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
  @Input() public course: Course;
  @Output() public remove = new EventEmitter();

  constructor(
    private router: Router
  ) {
  }

  public doEdit() {
    this.router.navigate(['courses', this.course.id]);
  }

  public doDelete() {
    this.remove.emit(this.course);
  }

  public calculateStatusClass(status): string {
    return 'open';
  }
}
