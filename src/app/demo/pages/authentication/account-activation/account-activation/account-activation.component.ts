import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_ACCOUNT } from 'src/app/theme/shared/configurations/urls';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { AppService } from 'src/app/theme/shared/services/app.service';
import { CommonAPIService } from 'src/app/theme/shared/services/common-api.service';
import { EqualValidator } from 'src/app/theme/shared/validators/equal.validator';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent {

  postForm:FormGroup;
  submitted:boolean;
  showPassword: boolean;
  resetCode: string;
  email: any;
  constructor(private formBuilder: FormBuilder,public routers: Router, private route: ActivatedRoute,private commonService:CommonAPIService,private appService:AppService,private alertService: AlertService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
     const loweredParams: any = this.appService.GetObjectWithLoweredPropertyNames(params);
     this.resetCode = loweredParams.code;
     this.email = loweredParams.email;
   });

   if( this.email != null){
     this.postForm.controls['email'].setValue(this.email);
   }
 }

  buildForm() {
    this.postForm = this.formBuilder.group({
      email:[null,[Validators.required]],
      newPassword:[null,[Validators.required,Validators.minLength(8), Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/)]],
      confirmPassword:[null,[Validators.required,EqualValidator("newPassword")]]
    });
    this.submitted=false;
  }
  get formControls() {
    return this.postForm.controls;
  }

  onSubmit()
  {
    debugger;
    this.submitted=true;
    if (!this.postForm.valid) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.MANDOTORY_FIELDS
      );
      return;
    }

    var reqObj=
    {
      "email":this.postForm.value.email,
      "password":this.postForm.value.newPassword,
      // "confirmPassword":this.postForm.value.confirmPassword,
      "resetCode": this.resetCode
    }

    let url=USER_ACCOUNT.accountActivation;
    this.commonService.commonApiCall(
      url,
      HttpMethod.POST,
      reqObj, (result, statusFlag) => {
        if (statusFlag) {
          this.buildForm();
          this.routers.navigate(['auth/login']);

        }
        
      }
    );
  }

  showPasswordHandler() {
    this.showPassword = !this.showPassword;
  }
}
