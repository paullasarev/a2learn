import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { User }  from "../entities/user";

@Injectable()
export class AuthService {
  private user: User = new User('user', '');

  constructor() {
  }

  public logout() {
    console.log('AuthService.logout')
    this.user = null;
  }

  public login(user: User) {
    console.log('AuthService.login', user.name)
    this.user = user;
  }

  public isAuth() {
    return !!this.user;
  }

  public info() {
    let user = new User(this.user.name, "");
    user.password = "";

    return user;
  }
}
