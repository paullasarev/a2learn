import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import {AuthState, authReducer} from './reducers/auth';

export {AuthState} from './reducers/auth';

export interface AppState {
  auth: AuthState;
}

export const selector = {
  auth: "auth",
};

const reducers = {
  auth: authReducer,
};

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return productionReducer(state, action);;
}
