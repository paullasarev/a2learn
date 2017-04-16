import {
  Component, ViewEncapsulation, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

import {Course} from '../../../entities/course';
import {CoursesService} from '../../../services/courses-service';

@Component({
  selector: 'course-detail',
  template: require('./course-detail.component.html'),
  styles: [
    require('./course-detail.styles.scss'),
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  private courseSubscription: Subscription;

  public id: string = "";
  public course: Course = new Course();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private coursesService: CoursesService
    ) {
  }

  public ngOnInit() {
    this.courseSubscription = this.coursesService.item.subscribe(
      this.gotData.bind(this), this.gotError.bind(this));
    this.route.params.subscribe(this.onChangeRoute.bind(this));
  }

  public ngOnDestroy() {
    this.courseSubscription.unsubscribe();
  }

  private onChangeRoute(params: Params) {
    let id:string = params.id || "";

    if (!id || this.id !== id) {
      this.course = new Course();
    }

    this.id = id;
    this.askCourse();
  }

  private askCourse() {
    this.coursesService.askItem(this.id);
  }

  private gotData(course: Course) {
    if (course.id == this.id) {
      this.course = course;
    }
    this.changeDetectorRef.markForCheck();
  }

  private gotError(error) {
    this.changeDetectorRef.markForCheck();
    this.router.navigate(['error', (error && error.message)], {skipLocationChange:true});
  }

  public doSave() {
    if (this.course.id) {
      this.coursesService.saveItem(this.course);
    } else {
      this.coursesService.newItem(this.course)
        .then((course: Course) => {
          this.router.navigate(['courses', course.id], {replaceUrl: true});
        });
    }
  }

  public doCancel() {
    this.location.back();
  }

}
