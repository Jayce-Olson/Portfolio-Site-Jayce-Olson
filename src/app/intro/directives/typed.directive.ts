import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Directive({
  selector: '[appTyped]',
  standalone: true
})
export class TypedDirective implements OnInit {
  @Input() text: string[] = [];
  typeSpeed = 50;
  backSpeed = 30;
  loop = true;
  constructor(private el: ElementRef) { }


  ngOnInit(): void {
    const options = {
      strings: this.text,
      typeSpeed: this.typeSpeed,
      backSpeed: this.backSpeed,
      loop: this.loop,
    };

    new Typed(this.el.nativeElement, options);
  }
}
