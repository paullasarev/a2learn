import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Course, Courses } from '../../entities/course';
import { CoursesService } from '../../services/courses-service';

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

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.coursesSubscription = this.coursesService.list.subscribe(this.gotData.bind(this));
    this.askData();
  }

  public ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  private gotData(courses: Courses) {
    console.log('CoursesComponent.gotData');
    this.isLoading = false;
    this.courses = courses;
  }

  private askData(filter?: string) {
    this.isLoading = true;
    this.coursesService.askList(filter);
  }

  public onFind(filter: string) {
    this.askData(filter);
  }

  public onAdd(filter: string) {
    this.router.navigate(['courses/new']);
  }

  public onDelete(course) {
    console.log('CoursesComponent.onDelete', course);
  }
}
