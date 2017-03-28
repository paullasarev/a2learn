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
    if (state==='fresh') {
      el.nativeElement.style.borderColor = 'green';
    } else if (state==='upcoming') {
      el.nativeElement.style.borderColor = 'blue';
    } else {
      el.nativeElement.style.borderColor = null;
    }
  }
}
