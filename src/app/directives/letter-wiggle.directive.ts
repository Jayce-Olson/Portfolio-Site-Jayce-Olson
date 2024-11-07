import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appLetterWiggle]',
  standalone: true
})
export class LetterWiggleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const text = this.el.nativeElement.textContent;
    // clear current text
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
  
    const words = text.split(" ");

    words.forEach((word: string, index: number) => {
      word = word + " ";
      const wrappedWord = this.renderer.createElement("p");
  
      word.split("").forEach((char: string) => {
        const letterSpan = this.renderer.createElement("span");
        if (char === " ") {
          this.renderer.setProperty(letterSpan, 'innerHTML', '&nbsp;');
        } else {
          this.renderer.setProperty(letterSpan, "innerText", char);
        }
  
        this.renderer.appendChild(wrappedWord, letterSpan);
      });
  
      this.renderer.appendChild(this.el.nativeElement, wrappedWord);
    });
  }
  

  @HostListener('mouseover', ['$event']) hover(e: MouseEvent){
    let span = e.target as HTMLElement;
    if(span.tagName === "SPAN"){
      span.classList.add('jump-animation');
    }
  }

  @HostListener('mouseout', ['$event']) unHover(e: MouseEvent){
    let span = e.target as HTMLElement;
    if(span.tagName === "SPAN"){
      setTimeout(() => {
        span.classList.remove('jump-animation');
      }, 500);
    }
  }
}


