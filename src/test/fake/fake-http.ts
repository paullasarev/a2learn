import {Observable, Subject} from 'rxjs';
import { Http, Response, URLSearchParams } from '@angular/http';

export class FakeHttp {
  private responses: {[key: string]: Response} = {};

  public setResonse(url: string, response: Response) {
    this.responses[url] = response;
  }

  public get(url): Observable<Response> {
    return Observable.of(this.responses[url]);
  }
}
