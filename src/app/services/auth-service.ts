import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { User }  from "../entities/user";

@Injectable()
export class AuthService {
  private user: User = new User('user', '');

  private authRequests: Subject<User>;
  private askRequests: Subject<User>;
  private auth$: Observable<User>;

  constructor() {
    this.authRequests = new Subject<User>();
    this.askRequests = new Subject<User>();
    this.auth$ = Observable.merge(
      this.authRequests
      .map(this.doAuth.bind(this))
      .debounceTime(200),
      this.askRequests
    );
  }

  public askAuth() {
    this.askRequests.next(this.user);
  }

  public logout() {
    console.log('AuthService.logout')
    this.user = null;
    this.authRequests.next(null);
  }

  public login(user: User) {
    console.log('AuthService.login', user.name)
    this.authRequests.next(user);
  }

  public doAuth(user: User) {
    if (user && user.name == 'e') {
      throw new Error("wrong credentials");
    }

    this.user = user;
    return user;
  }

  public get auth() : Observable<User> {
    return this.auth$;
  }
}
