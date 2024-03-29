// Angular import
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/theme/shared/services/app.service';

@Component({
  selector: 'app-nav-logo',
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent {
  // public props
  @Input() navCollapsed: boolean;
  @Output() NavCollapse = new EventEmitter();
  windowWidth: number;
  companyId: any;

  // Constructor
  constructor(private appService: AppService) {
    this.windowWidth = window.innerWidth;
    this.companyId = this.appService.getCompanyDetails();
    console.log(this.companyId);
  }

  // public import
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }
}
