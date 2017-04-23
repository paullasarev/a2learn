import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Http, Response, URLSearchParams } from '@angular/http';
import { find, remove, clone, each, map } from 'lodash';
import { Router } from '@angular/router';

import { Author, Authors }  from "../entities/author";
import { LoadBlockService } from '../services/load-block';
import { AuthorizedHttp } from '../services/authorized-http';

@Injectable()
export class AuthorsService {
  private apiUrl = "/api/authors";

  private listRequests: Subject<any>;
  private list$: Observable<Authors>;

  constructor(
    private http: AuthorizedHttp,
    private router: Router,
    private loadBlockService: LoadBlockService,
  ) {
    this.listRequests = new Subject<any>();
    this.list$ = this.listRequests
      .do(()=>{this.loadBlockService.show()})
      .switchMap(this.getList.bind(this))
      .do(()=>{this.loadBlockService.hide()})
      .share()
    ;

    //keep at least one observer
    this.list$.subscribe(()=>{});
  }

  private getList(obj: any): Observable<Author> {
    return this.http.get(this.apiUrl)
      .map(this.extractList.bind(this))
    ;
  }

  private extractList(response: Response): Authors {
    let body = response.json();
    return map<any, Author>(body, this.extract.bind(this));
  }

  private extract(item: any): Author {
    return new Author(
      item.id,
      item.firstName,
      item.lastName,
    );
  }

  private encode(item: Author): any {
    return {
      "id": item.id,
      "firstName": item.firstName,
      "lastName": item.lastName,
    }
  }

  public askList(obj: any) : void {
    this.listRequests.next(obj);
  }

  public get list() : Observable<Authors> {
    return this.list$;
  }

}
