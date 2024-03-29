import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit  } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-icons-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './icons-list.component.html',
  styleUrls: ['./icons-list.component.scss']
})
export default class IconsListComponent implements AfterViewInit  {

  iframeSrc: string = 'assets/tabler-icons.html';

  ngOnInit(): void {
  }
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.adjustIframeHeight();
  }

  adjustIframeHeight() {
    const iframe = this.el.nativeElement.querySelector('iframe');
    if (iframe) {
      iframe.onload = () => {
        const contentHeight = iframe.contentWindow.document.body.scrollHeight + 'px';
        iframe.style.height = contentHeight;
      };
    }
  }

}
