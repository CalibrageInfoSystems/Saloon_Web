import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[numberOnly]',
    standalone: true
})
export class NumberOnlyDirective {
    // Allow decimal numbers and negative values
    //  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    private regex: RegExp = new RegExp(/^-?[0-9]+$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1 || (event.key === 'a' && event.ctrlKey === true) || (event.key === 'c' && event.ctrlKey === true) || (event.key === 'v' && event.ctrlKey === true) || (event.key === 'x' && event.ctrlKey === true)) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
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