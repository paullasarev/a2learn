import {ActionTypes, Actions, UpdateListAction }  from '../actions/courses';

import { Course, Courses, Filter }  from "../../entities/course";
import { Authors, Author }  from "../../entities/author";

export interface CoursesState {
  list: Courses;
  filter: Filter;
  item: Course;
};

const coursesInitialState: CoursesState = {
  list: [],
  filter: {start: 0, count: 100, query:"", sort:"date", reverse: false},
  item: new Course(),
};

export function coursesReducer(state = coursesInitialState, action: Actions): CoursesState {
  switch (action.type) {

    case ActionTypes.GET_LIST: {
      const filter: Filter = action.payload as Filter;
      return {...state, filter: filter};
    }

    case ActionTypes.UPDATE_LIST: {
      const list: Courses = action.payload as Courses;
      return {...state, list: list};
    }

    case ActionTypes.UPDATE_ITEM: {
      const item: Course = action.payload as Course;
      return {...state, item: item};
    }

    default: {
      return state;
    }
  }
}
