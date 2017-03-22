import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable()
export class LoadBlockService {
  private loadRequest: Subject<boolean>;
  private load$: Observable<boolean>;

  constructor() {

    this.loadRequest = new Subject<boolean>();
    this.load$ = this.loadRequest
      .map((x)=>(x ? 1 : -1))
      .scan((acc, x)=>(acc + x))
      .map((x)=>(!!x))
    ;
  }

  public show() : void {
    this.loadRequest.next(true);
  }

  public hide() : void {
    this.loadRequest.next(false);
  }

  public get load() : Observable<boolean> {
    return this.load$;
  }

}
