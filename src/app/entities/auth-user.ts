import { User } from './user';

export class AuthUser {
  constructor(
    public user: User,
    public error?: Error
  ) {
  }

  public get isLogged(): boolean {
    return !!this.user && !this.error;
  }

  public get username(): string {
    return  (this.user && this.user.name) || "";
  }
}
