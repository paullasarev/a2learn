import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'courses-error',
  styles: [require('./error.styles.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="courses-error">
      <div class="courses-error__message">{{message}}</div>
    </div>
  `
})
export class ErrorComponent implements OnInit {
  private message: string;

  constructor (private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.params.forEach(this.onChangeRoute.bind(this));
  }

  private onChangeRoute(params: Params) {
    this.message = params['message'] || "unknown error";
  }
}
