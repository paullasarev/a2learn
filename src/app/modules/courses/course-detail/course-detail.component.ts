import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';

import {Course} from '../../../entities/course';
import {CoursesService} from '../../../services/courses-service';

@Component({
  selector: 'course-detail',
  template: require('./course-detail.component.html'),
  styles: [
    require('./course-detail.styles.scss'),
    require('../../../styles/form.scss'),
  ],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  private courseSubscription: Subscription;

  public id: string = "";
  public course: Course = new Course();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
    ) {
  }

  public ngOnInit() {
    this.courseSubscription = this.coursesService.item.subscribe(
      this.gotData.bind(this), this.gotError.bind(this));
    this.route.params.forEach(this.onChangeRoute.bind(this));
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
    console.log('askCourse', this.id);
    this.coursesService.askItem(this.id);
  }

  private gotData(course: Course) {
    console.log('CourseDetailComponent.gotData', this.id, course);

    if (course.id == this.id) {
      this.course = course;
    }
  }

  private gotError(error) {
    this.router.navigate(['error', (error && error.message)], {skipLocationChange:true});
  }

  public doSave() {
    console.log('doSave', this.course);
  }

  public doCancel() {
    console.log('doCancel', this.course);
    this.router.navigate(['courses']);
  }

}
