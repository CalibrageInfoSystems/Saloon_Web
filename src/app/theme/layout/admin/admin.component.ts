// Angular import
import { Component, NgZone } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// Project import
import { SrikarConfig } from '../../../app-config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  // public props
  SrikarConfig;
  navCollapsed: boolean;
  navCollapsedMob = false;
  windowWidth: number;

  // Constructor
  constructor(
    private zone: NgZone,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.SrikarConfig = SrikarConfig;

    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      this.SrikarConfig.isCollapse_menu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 320 ? SrikarConfig.isCollapse_menu : false;
  }

  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
