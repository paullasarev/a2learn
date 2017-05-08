import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { StorageService } from "../../services/storage-service";
import { LoadBlockService } from '../../services/load-block';
import { ActionTypes, AuthAction, AuthSuccessAction } from '../actions/auth';
import { User } from "../../entities/user";
import { AuthUser }  from "../../entities/auth-user";

const STORAGE_KEY = 'auth';

@Injectable()
export class AuthEffects {

  private errorUser: AuthUser = new AuthUser(null);
  private authUrl = "/api/auth/login";

  constructor(
    private http: Http,
    private actions$: Actions,
    private loadBlockService: LoadBlockService,
    private storage: StorageService
  ) {}

  @Effect() login$ = this.actions$
    .ofType(ActionTypes.AUTH)
    .map( (action: AuthAction) => (action.payload) )
    .do(()=>{this.loadBlockService.show()})
    .switchMap((user: User) => {
        if (!user) {
          return Observable.of(new AuthSuccessAction(this.errorUser))
        }
        return this.http.post(this.authUrl, {
            login: user.name,
            password: user.password
          })
          .map((response:Response) => {
            let body = response.json();
            let theUser = new User(user.name, '', body.token);
            this.storage.setItem(STORAGE_KEY, theUser);

            return new AuthSuccessAction(new AuthUser(theUser))
          })
          .catch(this.handleError.bind(this, user))
      })
     .do(()=>{this.loadBlockService.hide()})
 ;

  private handleError(user: User, response: Response): Observable<AuthSuccessAction> {
    return Observable.of(new AuthSuccessAction(new AuthUser(user, new Error(response.statusText))) );
  }

  @Effect() init$ = this.actions$
    .ofType('@ngrx/store/init')
    .map((action) => {
      let item = this.storage.getItem(STORAGE_KEY);
      return new AuthSuccessAction(new AuthUser(item))
    })
  ;

}
