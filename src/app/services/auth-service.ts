import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { User }  from "../entities/user";
import { AuthUser }  from "../entities/auth-user";
import { StorageService } from "./storage-service";

const STORAGE_KEY = 'auth';

@Injectable()
export class AuthService {
  private user: AuthUser; // = new AuthUser(new User('user', ''));

  private authRequests: Subject<User>;
  private askRequests: Subject<AuthUser>;
  private auth$: Observable<AuthUser>;

  constructor(private storage: StorageService) {
    this.authRequests = new Subject<User>();
    this.askRequests = new Subject<AuthUser>();
    this.auth$ = Observable.merge(
      this.authRequests
        .map(this.doAuth.bind(this))
        .debounceTime(200),
      this.askRequests
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

  public doAuth(user: User): AuthUser {
    this.user = new AuthUser(user);

    if (user && user.name === 'e') {
      this.user.error = new Error("wrong credentials");
    } else if (user) {
      this.storage.setItem(STORAGE_KEY, user);
      this.user.user.token = new Date().toUTCString();
    } else {
      this.storage.removeItem(STORAGE_KEY);
    }

    return this.user;
  }

  public get auth() : Observable<AuthUser> {
    return this.auth$;
  }

}
