import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ForgotPasswordComponent from './forgot-password/forgot-password.component';
import LoginComponent from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountActivationComponent } from './account-activation/account-activation/account-activation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent 
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component')
      },
      {
        path: 'account-activation', component: AccountActivationComponent 
      },
      {
        path: 'forgot-password', component: ForgotPasswordComponent 
      },
      {
        path: 'reset-password', component: ResetPasswordComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
