import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { CommonAPIService } from 'src/app/theme/shared/services/common-api.service';
import { USER_ACCOUNT } from 'src/app/theme/shared/configurations/urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AppService } from 'src/app/theme/shared/services/app.service';
@Component({
  selector: 'app-login',
//   standalone: true,
//  imports: [CommonModule, RouterModule,SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  loginForm:FormGroup;
  submitted:boolean;
  showPassword: boolean;
  constructor(private formBuilder: FormBuilder,public router: Router,private alertService: AlertService,private commonService:CommonAPIService,private appService:AppService) {
    this.buildForm();
  }


  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required],
      companyId:[1]
    });
  }


  logIn()
  {

    this.submitted=true;
    if (!this.loginForm.valid) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.MANDOTORY_FIELDS
      );
      return;
    }

    const obj = {
      UserName:  this.loginForm.value.email,
      Password:this.loginForm.value.password,
    };

    let url=USER_ACCOUNT.login;
    this.commonService.commonApiCall(
      url,
      HttpMethod.POST,
      obj, (result, statusFlag) => {
        if (statusFlag) {
          if (result) {
            this.submitted=false;
            this.appService.setUserDetails(result);
            // var obj2 = {companyId:this.loginForm.value.companyId}
            // this.appService.setCompanyDetails(this.loginForm.value.companyId);
            this.router.navigate(['/default']);
          }
        }

      }
    );
  }
  showPasswordHandler() {
    this.showPassword = !this.showPassword;
  }

}
