import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Router } from '@angular/router';

import { CourseComponent } from '../app/modules/courses/course/course.component';
import { CourseStateDirective } from '../app/modules/courses/state/state.directive';
import { ActionComponent } from '../app/modules/core/action/action.component';
import { DurationPipe } from '../app/modules/core/pipes/duration.pipe';
import { Course } from '../app/entities/course';
import { Author } from '../app/entities/author';

class RouterStub {
  navigate(data: any) {}
}

describe("courses", function() {
  let comp: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let course: Course;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [
        CourseComponent,
        DurationPipe,
        CourseStateDirective,
        ActionComponent,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
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
    de = fixture.debugElement.query(By.css('.course'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('title should be rendered', function() {
    let el= fixture.debugElement.query(By.css('.course__title'));

    expect(el.nativeElement.textContent).toContain("TITLE");
  })

  it('getState should be fresh', () => {
    expect(comp.getState()).toEqual("fresh");
  })

  it('do Edit should route', () => {
    comp.doEdit();
    comp.doDelete();
  })
})
