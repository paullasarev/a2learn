import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Course, Courses} from '../../entities/course';
import {CoursesService} from '../../services/courses-service';

@Component({
  selector: 'courses',
  encapsulation: ViewEncapsulation.None,
  providers: [CoursesService],
  styles: [require('./courses.styles.scss')],
  template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {
  private coursesSubscription: Subscription;
  public courses: Course[];
  private isLoading: boolean = false;

  constructor(private coursesService: CoursesService) {
    // this.courses = [
    //   new Course('1', 'javascript', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore fuga tenetur illum, reprehenderit possimus architecto optio maxime dolore iure, nobis, provident. Repellat quod cupiditate doloremque esse natus vero delectus dolores!', 600),
    //   new Course( '2', 'CSS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora repellendus deleniti temporibus nesciunt culpa recusandae excepturi mollitia minima, provident commodi maxime illum voluptates architecto et nobis corrupti. Optio esse, quod.', 300)
    // ];
  }

  public ngOnInit() {
    this.coursesSubscription = this.coursesService.source.subscribe((courses: Courses) => {
      this.isLoading = false;
      this.courses = courses;
    });

    this.loadData();
  }

  private loadData(filter?: string) {
    this.isLoading = true;
    this.coursesService.start(filter);
  }

  public ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  public onFind(filter: string) {
    this.loadData(filter);
  }

  public onDelete(course) {
    console.log('couses.onDelete', course);
  }
}
