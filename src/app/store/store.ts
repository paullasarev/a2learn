import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import {AuthState, authReducer} from './reducers/auth';
export {AuthState} from './reducers/auth';

import {CoursesState, coursesReducer} from './reducers/courses';

export interface AppState {
  auth: AuthState;
  courses: CoursesState;
}

export const selector = {
  auth: "auth",
  courses: "courses",
};

const reducers = {
  auth: authReducer,
  courses: coursesReducer,
};

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return productionReducer(state, action);;
}
