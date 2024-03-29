import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Appconfig } from '../enums/http-handler';


@Directive({
  selector: '[hasAnyAuthority]',
  standalone: true
})
export class HasAnyAuthorityDirective {

  private authorities: string[];
  currentUser: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set hasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === "string" ? [value] : value;
    this.currentUser = JSON.parse(localStorage.getItem(Appconfig.CURRENTUSER));


   if(value==undefined)
   {
    this.updateView();
   }

    if (this.currentUser && value) {
      if(this.currentUser.activityRights.length){
        for(let i = 0; i < this.currentUser.activityRights.length; i++) {
          for(let j = 0; j < this.authorities.length; j++) {
              if(this.currentUser.activityRights[i].name === this.authorities[j]) {
                this.updateView();
              }
          }
      }
      }
      
  }
}
  private updateView(): void {
    this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
