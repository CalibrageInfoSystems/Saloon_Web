import { Injectable } from '@angular/core';
import { Appconfig } from '../enums/http-handler';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

   // related to configuration

  setUserDetails(token) {
    localStorage.setItem(Appconfig.CURRENTUSER, JSON.stringify(token));
  }
  setCompanyDetails(data) {
    localStorage.setItem(Appconfig.COMPANYID, JSON.stringify(data));
  }

  getCompanyDetails() {
    return JSON.parse(localStorage.getItem(Appconfig.COMPANYID));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem(Appconfig.CURRENTUSER));
  }

  clearUserDetails() {
    localStorage.removeItem(Appconfig.CURRENTUSER);
    localStorage.removeItem(Appconfig.COMPANYID);
  }

  logOut() {
       this.clearUserDetails();
  }

  checkNullOrUndefined(val) {
    if (val === null || val === undefined) {
      return true;
    } else {
      return false;
    }
  }
  GetObjectWithLoweredPropertyNames(obj: any) {
    const loweredObj = Object.keys(obj).reduce((newObj, k) => {
      newObj[k.toLowerCase()] = obj[k];
      return newObj;
    }, {});

    return loweredObj;
  }
}
