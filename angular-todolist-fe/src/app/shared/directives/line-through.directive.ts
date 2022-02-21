import { Directive, ElementRef, OnChanges, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLineThrough]',
})
export class LineThroughDirective implements OnChanges {
  @Input('appLineThrough')
  doShow: boolean = false;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  public ngOnChanges(): void {
    if (this.doShow) {
      this.renderer2.setStyle(this.elementRef.nativeElement, 'text-decoration', 'line-through');
    }
  }
}
