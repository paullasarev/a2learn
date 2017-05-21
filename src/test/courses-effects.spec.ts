import { TestBed, inject} from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { Router } from '@angular/router';

import {CoursesEffects} from '../app/store/effects/courses';
import { ActionTypes, GetListAction, GetItemAction,
   UpdateListAction, UpdateItemAction, SaveItemAction,
   NewItemAction, RemoveItemAction }  from '../app/store/actions/courses';
import { Course } from '../app/entities/course';
import { Author } from '../app/entities/author';

import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { AppState, selector, reducer } from '../app/store/store';

import { Http, Response, ResponseOptions } from '@angular/http';

import { FakeHttp } from './fake/fake-http';
import {FakeRouter} from './fake/fake-router';
import { LoadBlockService } from '../app/services/load-block';

// let corsesDb = require '../../mock-server/services/core/courses/courses.db.json';

describe('courses Effect', () => {
  let runner: EffectsRunner;
  let coursesEffects: CoursesEffects;
  let course: Course;
  let http = new FakeHttp();
  let router = new FakeRouter();
  let loadBlockService: LoadBlockService;
  let store$: Store<AppState>;
  let courseBody =  {
    "id": "8693",
    "name": "title",
    "description": "description",
    "isTopRated": true,
    "date": "2017-09-28T04:39:24+00:00",
    "authors": [
      {
        "id": "1370",
        "firstName": "Polly",
        "lastName": "Sosa"
      }
    ],
    "length": 157
  };
  let filter  = {
    start: 0,
    count: 10,
    query: "",
    sort: "date",
    reverse: false,
  };

  beforeEach(()=>{
    course = new Course(
      "8693",
      "title",
      "description",
      157,
      true,
      new Date(courseBody.date),
      [new Author("1370", "Polly", "Sosa")]
    );

    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(reducer),
        EffectsTestingModule,
      ],
      providers: [
        CoursesEffects,
        LoadBlockService,
        { provide: Http, useValue: http },
        { provide: Router, useValue: router },
      ]
    });

    store$ = TestBed.get( Store );
    loadBlockService = TestBed.get( LoadBlockService );

  })

  beforeEach(inject([
      EffectsRunner, CoursesEffects
    ],
    (_runner, _coursesEffects) => {
      runner = _runner;
      coursesEffects = _coursesEffects;
    }
  ));

  it('should return a UpdateItem action after GetItem request', (done) => {
    let options = new ResponseOptions({body:courseBody,status: 200} )
    http.setResonse(coursesEffects.apiUrl + '/' + course.id, new Response(options));

    coursesEffects.item$.subscribe(result => {
      expect(result).toEqual(new UpdateItemAction(course));
      done();
    });

    runner.queue(new GetItemAction(course.id));
  });

  it('should return a UpdateList action after GetItem request', (done) => {
    let options = new ResponseOptions({body:[courseBody], status: 200});
    http.setResonse(coursesEffects.apiUrl, new Response(options));

    coursesEffects.list$.subscribe(result => {
      expect(result.type).toEqual(ActionTypes.UPDATE_LIST);
      done();
    });

    runner.queue(new GetListAction(filter));
  });

  it('should return a GetListAction action after SaveItem request', (done) => {
    let options = new ResponseOptions({body:courseBody, status: 200});
    http.setPutResonse(coursesEffects.apiUrl + '/' + course.id, new Response(options));

    coursesEffects.save$.subscribe(result => {
      expect(result.type).toEqual(ActionTypes.GET_LIST);
      done();
    });
    runner.queue(new SaveItemAction(course));
  });

  it('should return a NO_ACTION action after NewItem request', (done) => {
    let options = new ResponseOptions({body:courseBody, status: 200});
    http.setPostResonse(coursesEffects.apiUrl, new Response(options));

    coursesEffects.new$.subscribe(result => {
      expect(result.type).toEqual('NO_ACTION');
      done();
    });
    runner.queue(new NewItemAction(course));
  });

  it('should return a GetListAction action after RemoveItem request', (done) => {
    let options = new ResponseOptions({body:courseBody, status: 200});
    http.setDeleteResonse(coursesEffects.apiUrl + '/' + course.id, new Response(options));

    coursesEffects.remove$.subscribe(result => {
      expect(result.type).toEqual(ActionTypes.GET_LIST);
      done();
    });
    runner.queue(new RemoveItemAction(course.id));
  });

});
