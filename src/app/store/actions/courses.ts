import { Action } from '@ngrx/store';
import { Course, Courses, Filter }  from "../../entities/course";

export const ActionTypes = {
  GET_LIST: '[Courses] list',
  UPDATE_LIST: '[Courses] update_list',
  GET_ITEM: '[Courses] item',
  UPDATE_ITEM: '[Courses] update_item',
  SAVE_ITEM: '[Courses] set item',
  NEW_ITEM: '[Courses] new item',
  REMOVE_ITEM: '[Courses] remove item',
}

export class GetListAction implements Action {
  readonly type = ActionTypes.GET_LIST;
  constructor(public payload: Filter) { }
}

export class UpdateListAction implements Action {
  readonly type = ActionTypes.UPDATE_LIST;
  constructor(public payload: Courses) { }
}

export class GetItemAction implements Action {
  readonly type = ActionTypes.GET_ITEM;
  constructor(public payload: string) { }
}

export class UpdateItemAction implements Action {
  readonly type = ActionTypes.UPDATE_ITEM;
  constructor(public payload: Course) { }
}

export class SaveItemAction implements Action {
  readonly type = ActionTypes.SAVE_ITEM;
  constructor(public payload: Course) { }
}

export class NewItemAction implements Action {
  readonly type = ActionTypes.NEW_ITEM;
  constructor(public payload: Course) { }
}

export class RemoveItemAction implements Action {
  readonly type = ActionTypes.REMOVE_ITEM;
  constructor(public payload: string) { }
}


export type Actions
  = GetListAction
  | UpdateListAction
  | GetItemAction
  | UpdateItemAction
  | SaveItemAction
  | NewItemAction
  | RemoveItemAction
  ;
