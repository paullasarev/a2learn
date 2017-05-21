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
  public authUrl = "/api/auth/login";

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
    this.authRequests.next(null);
  }

  public login(user: User) {
    this.authRequests.next(user);
  }

  private handleError(user: User, response: Response): Observable<AuthUser> {
    return Observable.of(new AuthUser(user, new Error(response.statusText)));
  }

  private doAuth(user: User, response: Response): AuthUser {
    let body = response.json();
    user.token = body.token;
    user.password = '';
    this.storage.setItem(STORAGE_KEY, user);
    this.user = new AuthUser(user);
    return this.user;
  }

  public get auth() : Observable<AuthUser> {
    return this.auth$;
  }

  public isLoggedIn(): boolean {
    return this.user.isLogged;
  }

  public getToken(): string {
    return this.user && this.user.user && this.user.user.token || "";
  }

  public redirectUrl: string;

}
