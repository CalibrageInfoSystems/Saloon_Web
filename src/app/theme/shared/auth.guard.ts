import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Appconfig } from './enums/http-handler';

@Injectable({
  providedIn: 'root',
})

export class authGuard {
  constructor(public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    const currentUser = JSON.parse(localStorage.getItem(Appconfig.CURRENTUSER));
    if (currentUser) {
      if (route.data['activityRights']) {
        if (route.data['activityRights']) {
          const res = [];
          route.data['activityRights'].forEach(function (key) {
            currentUser.activityRights.filter(function (item) {
              if (item.name == key) {
                res.push(item);
              }
            });
          });
          if (res.length > 0) {
            return true;
          } else {
            this.router.navigate(['un-authorized']);
            return false;
          }
        }
      }
      // authorised so return true
      return true;
    }
   
    this.router.navigate(['auth/login']);
    return false;
    
  }
}