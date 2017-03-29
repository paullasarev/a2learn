import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[courseState]'
})
export class CourseStateDirective implements OnInit, OnChanges {
  @Input() courseState: string;

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    this.setState(this.el, this.courseState);
  }

  ngOnChanges() {
    this.setState(this.el, this.courseState);
  }

  private setState(el, state) {
    let borderWidth = null;
    let borderColor = null;
    if (state==='fresh') {
      borderColor = 'green';
      borderWidth = '2px';
    } else if (state==='upcoming') {
      borderColor = 'blue';
      borderWidth = '2px';
    }

    el.nativeElement.style.borderColor = borderColor;
    el.nativeElement.style.borderWidth = borderWidth;
  }
}
