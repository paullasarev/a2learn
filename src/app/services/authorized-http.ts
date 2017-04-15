import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions,
   ConnectionBackend, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from "rxjs";

import { AuthService } from './auth-service';

@Injectable()
export class AuthorizedHttp extends Http {
    constructor(
      private authService: AuthService,
      backend: ConnectionBackend,
      defaultOptions: RequestOptions) {
      super(backend, defaultOptions)
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      if (!options) {
        // let's make option object
        options = {
          headers: new Headers(),
        };
      }
      options.headers.append('Authorization', 'Basic ' + this.authService.getToken());
      options.withCredentials = true;
      console.log('AuthorizedHttp', options)
      return super.request(url, options)
    }

}
