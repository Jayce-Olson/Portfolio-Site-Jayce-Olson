import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDrag]',
  standalone: true,
})
export class DragDirective {
  private isDragging = false;
  private offsetX: number = 0;
  private offsetY: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    // Calculate the initial offset when the mouse is pressed down
    this.offsetX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
    this.offsetY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
    // Change the cursor to grabbing when dragging starts
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
    event.preventDefault();  // Prevent default behavior (e.g., text selection)
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      // Move the element based on the mouse's position
      this.renderer.setStyle(this.el.nativeElement, 'left', `${event.clientX - this.offsetX}px`);
      this.renderer.setStyle(this.el.nativeElement, 'top', `${event.clientY - this.offsetY}px`);
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
    // Reset the cursor to grab when dragging ends
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }
}
