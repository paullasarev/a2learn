
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
// import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
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
