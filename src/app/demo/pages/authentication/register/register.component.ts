import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { NumberOnlyDirective } from 'src/app/theme/shared/directives/number.directive';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { SR_EMAIL, SR_PHONE_NO } from 'src/app/theme/shared/regex';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, NumberOnlyDirective, SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  registerForm: FormGroup;
  submitted:boolean;
  showPassword = [false, false];

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      mobileNo: [null, [Validators.required, Validators.pattern(SR_PHONE_NO)]],
      contactNo: [null, Validators.pattern(SR_PHONE_NO)],
      email: ['', [Validators.required, Validators.pattern(SR_EMAIL)]],
      userName: ['', Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
      isActive: [true]
    });
  }

  onSignIn() {
    this.submitted=true;
    if (!this.registerForm.valid) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.MANDOTORY_FIELDS
      );
      return;
    }
  }

  showPasswordHandler(index: number) {
    this.showPassword[index] = !this.showPassword[index];
  }
}
