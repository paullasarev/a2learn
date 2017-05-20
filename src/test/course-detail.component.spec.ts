import {ComponentFixture, TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription, Observable, Subject} from 'rxjs';
import {Location} from '@angular/common';
import * as _ from 'lodash';

import { CourseDetailComponent } from '../app/modules/courses/course-detail/course-detail.component';
import { ActionComponent } from '../app/modules/core/action/action.component';
import { DurationPipe } from '../app/modules/core/pipes/duration.pipe';
import { Course } from '../app/entities/course';
import { Author } from '../app/entities/author';

import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { AppState, selector, reducer } from '../app/store/store';

import {AuthorsService} from '../app/services/authors-service';

import { UpdateItemAction, ActionTypes }  from '../app/store/actions/courses';


import {
  FormComponent,
  FormGroupComponent,
  FormInputTextComponent,
  FormInputPasswordComponent,
  FormInputNumberComponent,
  FormInputTextareaComponent,
  FormInputDateComponent,
  FormInputBooleanComponent,
  FormCheckListComponent,
} from '../app/modules/core/form/form.component';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import {FakeRouter} from './fake/fake-router';
import {FakeActivatedRoute} from './fake/fake-activated-route';
import {FakeLocation} from './fake/fake-location';
import {FakeAuthorsService} from './fake/fake-authors-service';


describe("courses", function() {
  let comp: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;
  let course: Course;
  let router = new FakeRouter();
  let activatedRoute = new FakeActivatedRoute();
  let fakeLocation = new FakeLocation();
  let authorsService = new FakeAuthorsService();
  let store$: Store<AppState>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.provideStore(reducer),
      ],
      declarations: [
        CourseDetailComponent,
        DurationPipe,
        ActionComponent,
        FormComponent,
        FormGroupComponent,
        FormInputTextComponent,
        FormInputPasswordComponent,
        FormInputNumberComponent,
        FormInputTextareaComponent,
        FormInputDateComponent,
        FormInputBooleanComponent,
        FormCheckListComponent,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute},
        { provide: Location, useValue: fakeLocation },
        { provide: AuthorsService, useValue: authorsService },
      ],
    }).compileComponents();

    store$ = TestBed.get( Store );

    fixture = TestBed.createComponent(CourseDetailComponent);
    comp = fixture.componentInstance;
    course = new Course(
      "id",
      "title",
      "description",
      120,
      true,
      new Date(),
      [new Author("10", "John", "Dow")]
    );
    comp.course = course;

    fixture.autoDetectChanges(true);
    activatedRoute.params.next({id:course.id})
    return fixture.whenStable();
  });

  it('should get id', (() => {
      expect(comp.id).toEqual(course.id);
  }));

  it('id should be rendered', (() => {
      let el = fixture.debugElement.query(By.css('.course-detail'));
      expect(el.nativeElement.textContent).toContain(course.id);
  }));

  it('id should get course data', ((done) => {
    store$.dispatch(new UpdateItemAction(course));
    fixture.whenStable().then(() => {
      expect(comp.course).toEqual(course);
      done();
    })
  }));

  // function updateCourse(comp: CourseDetailComponent) {
  //   let controls = comp.courseForm.controls;
  //   [ 'title', 'description', 'creatingDate', 'duration', 'topRated', 'authors']
  //     .forEach((key)=>{
  //       controls[key].setValue(comp.course[key]);
  //     })
  // }

  it('should be validForm', () => {
    store$.dispatch(new UpdateItemAction(course));
    fixture.whenStable().then(() => {
      expect(comp.courseForm.valid).toBeTruthy();
    })
  });

  it('save should dispatch SaveItemAction', () => {
    store$.dispatch(new UpdateItemAction(course));
    fixture.whenStable().then(() => {
      spyOn(store$, 'dispatch');
      comp.doSave();
      expect(store$.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
        type: ActionTypes.SAVE_ITEM,
        payload: course
      }))
    })
  });


})
