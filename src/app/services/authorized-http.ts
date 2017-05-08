import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions,
   ConnectionBackend, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from "rxjs";

import { AuthService } from './auth-service';

import { Store } from '@ngrx/store';
import { AppState, selector } from '../store/store';
import { AuthState } from '../store/reducers/auth';

@Injectable()
export class AuthorizedHttp extends Http {
  private authState$: Observable<AuthState>;
  private authToken: string;

  constructor(
      // private authService: AuthService,
      private store: Store<AppState>,
      backend: ConnectionBackend,
      defaultOptions: RequestOptions) {
      super(backend, defaultOptions)
      this.authState$ = store.select(selector.auth);
       this.authState$.subscribe(this.onAuthState.bind(this));
  }

  private onAuthState(state: AuthState) {
    this.authToken = state.token;
  }

    request(url: string | Request, pOptions?: RequestOptionsArgs): Observable<Response> {
      let options = pOptions;
      if (typeof url === 'string') {
        if (!options) {
          options = {
            headers: new Headers(),
          };
          pOptions = options;
        }
      } else {
        options = url;
      }

      options.headers.set('Authorization', 'Bearer ' + this.authToken);
      options.withCredentials = true;

      return super.request(url, pOptions)
    }

}
