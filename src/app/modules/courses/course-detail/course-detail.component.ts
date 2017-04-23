import {
  Component, ViewEncapsulation, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {assign, union, uniqWith, isEqual} from 'lodash';

import {Course} from '../../../entities/course';
import {Author, Authors} from '../../../entities/author';
import {CoursesService} from '../../../services/courses-service';
import {AuthorsService} from '../../../services/authors-service';
import {IntegerValidator, NonEmptyCheckListValidator} from '../../core/form/form.component';

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
  private authorsSubscription: Subscription;

  public id: string = "";
  public course: Course = new Course();
  public authors: Authors = [];
  public courseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private authorsService: AuthorsService,
    ) {
      this.courseForm = this.formBuilder.group({
        title: ['',[Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(500)]],
        creatingDate: [new Date(), [Validators.required]],
        duration: [0, [Validators.required, IntegerValidator/*, Validators.pattern('[0-9]*')*/]],
        topRated: false,
        authors: [[], [Validators.required, NonEmptyCheckListValidator]],
      });
  }

  public ngOnInit() {
    this.courseSubscription = this.coursesService.item.subscribe(
      this.gotData.bind(this), this.gotError.bind(this));
    this.authorsSubscription = this.authorsService.list.subscribe(
      this.gotAuthors.bind(this)
    )
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
    this.authorsService.askList({});
  }

  private askCourse() {
    this.coursesService.askItem(this.id);
  }

  private setCourse(course: Course) {
    this.course = course;
    this.mergeAuthors();

    let model:any = assign({}, course);
    model.authors = this.authors.map(item => {
      let checked = !!course.authors.find(author => author.id == item.id);
      return {id: item.id, value: checked, label: item.firstName + ' ' + item.lastName}
    });
    this.courseForm.patchValue(model);
  }

  private gotAuthors(authors: Authors) {
    this.setAuthors(authors);
    this.setCourse(this.course);
    this.changeDetectorRef.markForCheck();
  }

  private mergeAuthors() {
    this.authors = uniqWith(union(this.course.authors, this.authors), isEqual);
  }

  private setAuthors(authors: Authors) {
    this.authors = authors;
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
    if (!this.courseForm.valid) {
      return;
    }

    let checkedAuthorsIDs = this.courseForm.value.authors
      .filter(item => item.value)
      .map(item => item.id);
    let authors = this.authors.filter((item)=>(
      checkedAuthorsIDs.indexOf(item.id) >= 0));

    let model = assign({}, this.courseForm.value);
    model.authors = authors;
    assign(this.course, model);

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
