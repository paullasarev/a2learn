import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Http, Response } from '@angular/http';

import { User } from "../entities/user";
import { AuthUser }  from "../entities/auth-user";
import { StorageService } from "./storage-service";
import { LoadBlockService } from '../services/load-block';

const STORAGE_KEY = 'auth';

@Injectable()
export class AuthService {
  private errorUser: AuthUser = new AuthUser(null);
  private user: AuthUser;

  // private authUrl = "http://localhost:3004/auth/login";
  private authUrl = "/api/auth/login";

  private authRequests: Subject<User>;
  private askRequests: Subject<AuthUser>;
  private auth$: Observable<AuthUser>;

  constructor(
    private http: Http,
    private loadBlockService: LoadBlockService,
    private storage: StorageService
  ) {
    // this.user = this.errorUser;
    this.authRequests = new Subject<User>();
    this.askRequests = new Subject<AuthUser>();
    this.auth$ = Observable.merge(
      this.authRequests
        .do(()=>{this.loadBlockService.show()})
        .switchMap((user: User) => {
          console.log('switchMap user', user)
          if (!user) {
            return Observable.of(this.errorUser);
          }
          return this.http.post(this.authUrl, {
              login: user.name,
              password: user.password
            })
            .map(this.doAuth.bind(this, user))
            .catch(this.handleError.bind(this, user))
        })
        .do(()=>{this.loadBlockService.hide()})
      , this.askRequests
    );

    let item = this.storage.getItem(STORAGE_KEY);
    this.user = new AuthUser(item);
  }

  public askAuth() {
    this.askRequests.next(this.user);
  }

  public logout() {
    console.log('AuthService.logout')
    this.authRequests.next(null);
  }

  public login(user: User) {
    console.log('AuthService.login', user.name)
    this.authRequests.next(user);
  }

  private handleError(user: User, response: Response): Observable<AuthUser> {
      return Observable.of(new AuthUser(user, new Error(response.statusText)));
  }

  private doAuth(user: User, response: Response): AuthUser {
    let authUser: AuthUser;
    // if (response.status == 200) {
      let body = response.json();
      user.token = body.token;
      user.password = '';
      this.storage.setItem(STORAGE_KEY, user);
      authUser = new AuthUser(user);
    // } else {
    //   authUser = new AuthUser(user, new Error(response.statusText));
    // }
    this.user = authUser;
    return authUser;
  }

  // public doAuth(user: User): AuthUser {
  //   this.user = new AuthUser(user);

  //   if (user && user.name === 'e') {
  //     this.user.error = new Error("wrong credentials");
  //   } else if (user) {
  //     this.storage.setItem(STORAGE_KEY, user);
  //     this.user.user.token = new Date().toUTCString();
  //   } else {
  //     this.storage.removeItem(STORAGE_KEY);
  //   }

  //   return this.user;
  // }

  public get auth() : Observable<AuthUser> {
    return this.auth$;
  }

  public isLoggedIn(): boolean {
    return this.user.isLogged;
  }

  public redirectUrl: string;

}
