import {
  Component, ViewEncapsulation,
  OnInit, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
  trigger, transition, style, animate, state
} from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadBlockService } from '../../../services/load-block';

@Component({
  selector: 'load-block',
  template: `
      <div *ngIf="show" [@showAnimation]="show" class="load-block__paper">
        <div class="load-block__dots"></div>
      </div>
`,
  styles: [
    require('./load-block.styles.scss'),
  ],
  host: {class: 'load-block'},
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('showAnimation', [
      transition('void => *', [
        style({opacity: 0}),
        animate(600, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(600, style({opacity: 0}))
      ])
    ])
  ]
})
export class LoadBlockComponent implements OnInit, OnDestroy{
  private subscription: Subscription;

  public show: boolean = false;

  constructor(
    private loadBlockService: LoadBlockService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit() {
    this.subscription = this.loadBlockService.load.subscribe(this.gotData.bind(this));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private gotData(show) {
    this.show = show;
    this.changeDetectorRef.markForCheck();
  }

}
