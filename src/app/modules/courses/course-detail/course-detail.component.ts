import {
  Component, ViewEncapsulation, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {assign} from 'lodash';

import {Course} from '../../../entities/course';
import {CoursesService} from '../../../services/courses-service';
import {IntegerValidator} from '../../core/form/form.component';

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
  public courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
    ) {
      this.courseForm = this.formBuilder.group({
        title: ['',[Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(500)]],
        creatingDate: [new Date(), [Validators.required]],
        duration: [0, [Validators.required, IntegerValidator/*, Validators.pattern('[0-9]*')*/]],
        topRated: false,
      });
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
      this.setCourse(new Course());
    }

    this.id = id;
    this.askCourse();
  }

  private askCourse() {
    this.coursesService.askItem(this.id);
  }

  private setCourse(course: Course) {
    this.course = course;
    this.courseForm.patchValue(this.course);
  }

  private gotData(course: Course) {
    if (course.id == this.id) {
      this.setCourse(course);
    }
    this.changeDetectorRef.markForCheck();
  }

  private gotError(error) {
    this.changeDetectorRef.markForCheck();
    this.router.navigate(['error', (error && error.message)], {skipLocationChange:true});
  }

  public doSave() {
    assign(this.course, this.courseForm.value);
    if (!this.courseForm.valid) {
      return;
    }

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
