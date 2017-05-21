import {Observable, Subject} from 'rxjs';
import { Http, Response, URLSearchParams } from '@angular/http';

export class FakeHttp {
  private responses: {[key: string]: Response} = {};
  private postResponses: {[key: string]: Response} = {};
  private putResponses: {[key: string]: Response} = {};
  private deleteResponses: {[key: string]: Response} = {};

  public setResonse(url: string, response: Response) {
    this.responses[url] = response;
  }

  public setPostResonse(url: string, response: Response) {
    this.postResponses[url] = response;
  }

  public setPutResonse(url: string, response: Response) {
    this.putResponses[url] = response;
  }

  public setDeleteResonse(url: string, response: Response) {
    this.deleteResponses[url] = response;
  }

  public get(url): Observable<Response> {
    return Observable.of(this.responses[url]);
  }

  public put(url): Observable<Response> {
    return Observable.of(this.putResponses[url]);
  }

  public post(url): Observable<Response> {
    return Observable.of(this.postResponses[url]);
  }

  public delete(url): Observable<Response> {
    return Observable.of(this.deleteResponses[url]);
  }
}
