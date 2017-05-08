import {ActionTypes, Actions, AuthSuccessAction} from '../actions/auth';

import { AuthUser }  from "../../entities/auth-user";

export interface AuthState {
  isLogged: boolean;
  user: AuthUser;
  token: string;
  redirectUrl: string;
};

const initialState: AuthState = {
  isLogged: false,
  user: null,
  token: "",
  redirectUrl: "",
};

export function authReducer(state = initialState, action: Actions): AuthState {
  switch (action.type) {

    case ActionTypes.SUCCESS: {
      const user:AuthUser = action.payload;
      return {...state,
        user: user,
        isLogged: user.isLogged,
        token: user && user.user && user.user.token || "",
      };
    }

    case ActionTypes.LOGOUT: {
      return {...state, isLogged: false, user: new AuthUser(null), token: ""};
    }

    case ActionTypes.SET_REDIRECT_URL: {
      return {...state, redirectUrl: action.payload};
    }

    default: {
      return state;
    }
  }
}
