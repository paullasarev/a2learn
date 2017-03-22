import {
  Component, ViewEncapsulation, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Course, Courses } from '../../entities/course';
import { CoursesService } from '../../services/courses-service';

@Component({
  selector: 'courses',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [require('./courses.styles.scss')],
  template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {
  private coursesSubscription: Subscription;
  public courses: Course[];
  private isLoading: boolean = false;
  public showDeleteConfirm: boolean = false;
  private courseToDelete: Course;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private coursesService: CoursesService
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
    this.isLoading = false;
    this.courses = courses;
    this.changeDetectorRef.markForCheck();
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

  public onRemove(course) {
    this.courseToDelete = course;
    this.showDeleteConfirm = true;
    this.changeDetectorRef.markForCheck();
  }

  public doConfirmDelete() {
    this.coursesService.removeItem(this.courseToDelete.id);
    this.showDeleteConfirm = false;
    this.changeDetectorRef.markForCheck();
  }

  public doCancelDelete() {
    this.showDeleteConfirm = false;
    this.changeDetectorRef.markForCheck();
  }
}
