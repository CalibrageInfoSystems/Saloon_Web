// Angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/demo/pages/authentication/change-password/change-password.component';
import { DialogRequest } from 'src/app/theme/shared/enums/http-handler';
import { AppService } from 'src/app/theme/shared/services/app.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  currentUser: any;
  ChangePasswordComponent = ChangePasswordComponent;
  dialogRequest: DialogRequest = new DialogRequest();
  constructor(public router: Router,private appService:AppService,   private dialogService: DialogService, public ref: DynamicDialogRef) {
    this.currentUser = this.appService.getUserDetails();
    
  }


  logOut()
  {
    this.appService.clearUserDetails();
    this.router.navigate(['auth/login']);

  }

  openComponentDialog(content: any) {
    if (content === this.ChangePasswordComponent) {
      this.dialogRequest.dialogData = 'save';
      this.dialogRequest.header = "Confirm Password";
      this.dialogRequest.width = "30%";
    }
    this.ref = this.dialogService.open(content, {
      data: this.dialogRequest.dialogData,
      header: this.dialogRequest.header,
      width: this.dialogRequest.width,
    });
   
  }
}
