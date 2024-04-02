import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './theme/shared/auth.guard';
import PagenotfoundComponent from './theme/shared/components/pagenotfound/pagenotfound.component';
import { Permission } from './theme/shared/enums/permission';
import { UnAuthorizedComponent } from './theme/shared/components/un-authorized/un-authorized.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadComponent: () => import('./demo/main/components/security/users/users.component'),
        // canActivate: [authGuard],
        data: {
          title: "Users",
          activityRights: [
            Permission.CAN_VIEW_USERS
          ]
        }
      },
      {
        path: 'roles',
        loadComponent: () => import('./demo/main/components/security/roles/roles.component'),
        // canActivate: [authGuard],
        data: {
          title: "Roles",
          activityRights: [
            Permission.CAN_VIEW_ROLES
          ]
        }
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component'),
        canActivate: [authGuard],
        data: {
          title: "Default",
          // activityRights: [
          //   Permission.CAN_VIEW_DASHBOARD
          // ]
        }
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component'),
        canActivate: [authGuard]
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component'),
        canActivate: [authGuard]
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component'),
        canActivate: [authGuard]
      },
      {
        path: 'icons',
        loadComponent: () => import('./demo/elements/icons-list/icons-list.component'),
        canActivate: [authGuard]
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/elements/tables/tables.component'),
        canActivate: [authGuard]
      },
      {
        path: 'cards',
        loadComponent: () => import('./demo/elements/cards/cards.component'),
        canActivate: [authGuard]
      },
      {
        path: 'buttons',
        loadComponent: () => import('./demo/elements/buttons/buttons.component'),
        canActivate: [authGuard]
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/elements/forms/forms.component'),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
  {
    path: 'un-authorized',
    component: UnAuthorizedComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
