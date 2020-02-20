import { Directive , ElementRef ,HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private element : ElementRef) { 
  }

  @HostListener('mouseenter') addborder(){
    this.element.nativeElement.style.border = "10px solid rgba(28, 162, 184, 0.125)"   
  }
  @HostListener('mouseleave') removeborder(){
    this.element.nativeElement.style.border = "1px solid rgba(0,0,0,.125)"
  }
}
