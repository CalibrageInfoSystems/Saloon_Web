import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonAPIService } from 'src/app/theme/shared/services/common-api.service';
import { AppService } from 'src/app/theme/shared/services/app.service';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { USER_ACCOUNT } from 'src/app/theme/shared/configurations/urls';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
 // imports: [CommonModule, SharedModule],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export default class ForgotPasswordComponent {
  postForm:FormGroup;
  submitted:boolean;
  constructor(private formBuilder: FormBuilder,private commonService:CommonAPIService,private appService:AppService,private alertService: AlertService) {
    this.buildForm();
  }
  buildForm() {
    this.postForm = this.formBuilder.group({
      userNameorEmail:[null,[Validators.required]]
    });
    this.submitted=false;
  }
  get formControls() {
    return this.postForm.controls;
  }

  onSubmit()
  {
    this.submitted=true;
    if (!this.postForm.valid) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.MANDOTORY_FIELDS
      );
      return;
    }


    let url=USER_ACCOUNT.userForgotPassword;
    this.commonService.commonApiCall(
      url,
      HttpMethod.POST,
      this.postForm.getRawValue(), (result, statusFlag) => {
        if (statusFlag) {
          this.buildForm();
        }
        
      }
    );

  }
}
