import {
  Component, ViewEncapsulation, Input, Output, EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {Course} from '../../../entities/course';
import { Router } from '@angular/router';

@Component({
  selector: 'course',
  template: require('./course.component.html'),
  styles: [require('./course.styles.scss')],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
  @Input() public course: Course;
  @Output() public remove = new EventEmitter();

  constructor(
    private router: Router
  ) {
  }

  public getState(): string {
    let createdDate = this.course.creatingDate;
    createdDate.setHours(0,0,0,0);
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    let freshDate = new Date(Date.now() - 14*24*3600*1000);
    freshDate.setHours(0,0,0,0);

    if (createdDate <= currentDate && createdDate >= freshDate) {
      return "fresh";
    } else if (createdDate > currentDate) {
      return "upcoming";
    }

    return "";
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
