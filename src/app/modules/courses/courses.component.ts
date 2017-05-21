import {
  Component, ViewEncapsulation, OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Course, Courses, Filter } from '../../entities/course';
// import { CoursesService } from '../../services/courses-service';

import { Store } from '@ngrx/store';
import { AppState, selector } from '../../store/store';
import { CoursesState } from '../../store/reducers/courses';
import { GetListAction, RemoveItemAction }  from '../../store/actions/courses';

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
  public courseToDelete: Course;
  public isNoData: boolean = true;
  public filter: Filter = {start: 0, count: 5, query: "", sort:"date", reverse: false};
  private coursesState$: Observable<CoursesState>;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>,
    // private coursesService: CoursesService,
  ) {
    this.coursesState$ = this.store.select(selector.courses);
  }

  public ngOnInit() {
    // this.coursesSubscription = this.coursesService.list.subscribe(this.gotData.bind(this));
    this.coursesState$.subscribe(this.onChangeState.bind(this))
    this.askData();
  }

  public ngOnDestroy() {
    // this.coursesSubscription.unsubscribe();
  }

  private onChangeState(state: CoursesState) {
    this.gotData(state.list);
  }

  public gotData(courses: Courses) {
    this.isLoading = false;
    this.courses = courses;
    this.isNoData = !this.courses.length;
    this.changeDetectorRef.markForCheck();
  }

  private askData() {
    this.isLoading = true;
    // this.coursesService.askList(this.filter);
    this.store.dispatch(new GetListAction(this.filter));
  }

  public onFind(query: string) {
    this.filter.query = query;
    this.filter.start = 0;
    this.askData();
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
    // this.coursesService.removeItem(this.courseToDelete.id);
    this.store.dispatch(new RemoveItemAction(this.courseToDelete.id));
    this.showDeleteConfirm = false;
    this.changeDetectorRef.markForCheck();
  }

  public doCancelDelete() {
    this.showDeleteConfirm = false;
    this.changeDetectorRef.markForCheck();
  }

  public nextPage() {
    this.setPage(true);
    this.askData();
  }

  public prevPage() {
    this.setPage(false);
    this.askData();
  }

  private setPage(next: boolean) {
    const reverse = this.filter.reverse;
    if (reverse !== next) {
      if (this.courses.length == this.filter.count) {
        this.filter.start += this.filter.count - 1;
      }
    } else {
      this.filter.start -= this.filter.count - 1;
      if (this.filter.start < 0) {
        this.filter.start = 0;
      }
    }
  }

  public firstPage() {
    this.filter.start = 0;
    this.filter.reverse = false;
    this.askData();
  }

  public lastPage() {
    this.filter.start = 0;
    this.filter.reverse = true;
    this.askData();
  }
}
