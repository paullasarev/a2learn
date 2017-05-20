import {Router, ActivatedRoute, Params} from '@angular/router';
import {Subscription, Observable, Subject} from 'rxjs';

export class FakeRouter {
  public navigated: any;

  public navigate(data: any) {
    this.navigated = data;
  }
}

