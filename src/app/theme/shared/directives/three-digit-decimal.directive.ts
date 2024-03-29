import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[threeDigitDecimal]',
  standalone: true
})
export class ThreeDigitDecimalDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,3}$/g);

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home','ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1 || (event.key === 'a' && event.ctrlKey === true) || (event.key === 'c' && event.ctrlKey === true) || (event.key === 'v' && event.ctrlKey === true) || (event.key === 'x' && event.ctrlKey === true)) {
      return;
    }
    let current: string = this.el.nativeElement.value;

     if(this.el.nativeElement.value.length>=10)
     {
      event.preventDefault();
     }
     let next: string = current.concat(event.key);
    // const position = this.el.nativeElement.selectionStart;
    // const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let dataToPaste = event.clipboardData.getData('text');
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(dataToPaste);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }

  }
}
