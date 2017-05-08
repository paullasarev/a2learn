import { Action } from '@ngrx/store';
import { User } from "../../entities/user";
import { AuthUser } from "../../entities/auth-user";

export const ActionTypes = {
  AUTH: '[Auth] auth',
  LOGOUT: '[Auth] logout',
  SUCCESS: '[Auth] success',
  SET_REDIRECT_URL: '[Auth] set_redirect_url',
}

export class AuthAction implements Action {
  readonly type = ActionTypes.AUTH;
  constructor(public payload: User) { }
}

export class AuthSuccessAction implements Action {
  readonly type = ActionTypes.SUCCESS;
  constructor(public payload: AuthUser) { }
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;
  constructor(public payload?: any) { }
}

export class SetRedirectUrlAction implements Action {
  readonly type = ActionTypes.SET_REDIRECT_URL;
  constructor(public payload: string) { }
}


export type Actions
  = AuthAction
   | AuthSuccessAction
   | LogoutAction
   | SetRedirectUrlAction
  ;
