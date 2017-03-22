import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'no-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1>404: page missing</h1>
    </div>
  `
})
export class NoContentComponent {

}
