
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
// import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.styles.scss')
  ],
  template: require('./app.template.html')
})
export class AppComponent implements OnInit {

  constructor() {
  }

  public ngOnInit() {
  }

}
