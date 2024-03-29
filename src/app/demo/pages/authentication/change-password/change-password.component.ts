import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { USER_ACCOUNT } from 'src/app/theme/shared/configurations/urls';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { AppService } from 'src/app/theme/shared/services/app.service';
import { CommonAPIService } from 'src/app/theme/shared/services/common-api.service';
import { EqualValidator } from 'src/app/theme/shared/validators/equal.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  fbChangePassword!: FormGroup;
  submitted:boolean;
  currentUser: any;
  constructor(private formBuilder: FormBuilder,private commonService:CommonAPIService,private appService:AppService,private alertService: AlertService,public routers: Router,
    public dialogRef: DynamicDialogRef ) {

    this.currentUser = this.appService.getUserDetails();
    this.changePasswordForm();
  }
 changePasswordForm() {
  this.fbChangePassword = this.formBuilder.group({
      currentPassword:[null,[Validators.required,Validators.minLength(8), Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/)]],
      newPassword:[null,[Validators.required,Validators.minLength(8), Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/)]],
      confirmPassword:[null,[Validators.required,EqualValidator("newPassword")]]
  });
}

get formControls() {
  return this.fbChangePassword.controls;
}

onSubmit()
{
  this.submitted=true;
  if (!this.fbChangePassword.valid) {
    this.alertService.showMessage(
      AlertInfo.ERROR,
      CommonEnum.MANDOTORY_FIELDS
    );
    return;
  }

  var reqObj=
  {
    "email": this.currentUser.email,
    "currentPassword":this.fbChangePassword.value.currentPassword,
    "newPassword":this.fbChangePassword.value.newPassword,
  }

  let url=USER_ACCOUNT.userChangePassword;
  this.commonService.commonApiCall(
    url,
    HttpMethod.POST,
    reqObj, (result, statusFlag) => {
      if (statusFlag) {
        this.changePasswordForm();
        this.dialogRef.close();
        this.appService.clearUserDetails();
        this.routers.navigate(['auth/login']);

      }
      
    }
  );
}
}
