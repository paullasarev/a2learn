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

      options.headers.set('Authorization', this.authService.getToken());
      options.withCredentials = true;

      return super.request(url, pOptions)
    }

}
