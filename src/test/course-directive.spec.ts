import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Router } from '@angular/router';
import {Component,} from '@angular/core';

import { CourseStateDirective } from '../app/modules/courses/state/state.directive';

@Component({
  template: `<div [courseState]="'fresh'"></div>`
})
class TestComponent {
}

describe("courses", function() {
  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [
        CourseStateDirective,
        TestComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    comp = fixture.componentInstance;
    // fixture.autoDetectChanges(true);

    fixture.detectChanges();
    return fixture.whenStable();
  });

  it('courseState should be fresh', () => {
    const el = fixture.debugElement.query(By.directive(CourseStateDirective));
    expect(el).not.toBeNull();

    const instance = el.injector.get(CourseStateDirective) as CourseStateDirective;
    expect(instance.courseState).toBe('fresh');
  });

  it('getState border color should be green', () => {
    const el = fixture.debugElement.query(By.directive(CourseStateDirective));
    expect(el.nativeElement.style.borderColor).toBe('green');
  });

})
