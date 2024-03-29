import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import ForgotPasswordComponent from './forgot-password/forgot-password.component';
import LoginComponent from './login/login.component';
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordModule } from 'primeng/password';
import { AccountActivationComponent } from './account-activation/account-activation/account-activation.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AccountActivationComponent
  ],
  imports: [CommonModule, AuthenticationRoutingModule,NgbDropdownModule,NgbNavModule,NgbModule,NgbCollapseModule,FormsModule,ReactiveFormsModule,PasswordModule]
})
export class AuthenticationModule {}
