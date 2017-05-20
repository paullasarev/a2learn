import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription, Observable, BehaviorSubject} from 'rxjs';

export class FakeActivatedRoute{
  params: BehaviorSubject<Params> = new BehaviorSubject<Params>({});
}

