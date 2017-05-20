import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription, Observable, Subject} from 'rxjs';
import { Author, Authors } from '../../app/entities/author';

export class FakeAuthorsService{
  authors: Authors = [];

  list: Subject<Authors> = new Subject<Authors>();

  askList(params: any) {
    this.list.next(this.authors)
  }
}

