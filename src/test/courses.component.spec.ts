import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { CoursesComponent } from '../app/modules/courses/courses.component';
import { CourseComponent } from '../app/modules/courses/course/course.component';
import { ConfirmComponent } from '../app/modules/core/confirm/confirm.component';
import { CoursesToolbarComponent } from '../app/modules/courses/toolbar/courses-toolbar.component';
import { CourseStateDirective } from '../app/modules/courses/state/state.directive';
import { ActionComponent } from '../app/modules/core/action/action.component';
import { DurationPipe } from '../app/modules/core/pipes/duration.pipe';

import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { AppState, selector, reducer } from '../app/store/store';

import { Course, Courses } from '../app/entities/course';
import { Author } from '../app/entities/author';

import { ActionTypes }  from '../app/store/actions/courses';

import {FakeRouter} from './fake/fake-router';

describe("courses", function() {
  let comp: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let course: Course;
  let fakeRouter = new FakeRouter();
  let store$: Store<AppState>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.provideStore(reducer),
      ],
      declarations: [
        CoursesComponent,
        CourseComponent,
        ConfirmComponent,
        CoursesToolbarComponent,
        DurationPipe,
        CourseStateDirective,
        ActionComponent,
      ],
      providers: [
        { provide: Router, useValue: fakeRouter },
      ],
    }).compileComponents();

    store$ = TestBed.get( Store );

    fixture = TestBed.createComponent(CoursesComponent);
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
    comp.courses = [course];

    fixture.detectChanges();
  });

  it('title should be rendered', function() {
    let el= fixture.debugElement.query(By.css('.courses__list'));

    expect(el).toBeDefined();
  })

  it('confirm Delete should dispatch DeletItemAction', () => {
    spyOn(store$, 'dispatch');
    comp.courseToDelete = course;
    comp.doConfirmDelete();
    expect(store$.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: ActionTypes.REMOVE_ITEM,
      payload: course.id,
    }))
  });

})
