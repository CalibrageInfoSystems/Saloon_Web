import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { AlertInfo, HttpMethod } from '../enums/http-handler';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  constructor(private apiService: APIService,private alertService: AlertService, private spinner: NgxSpinnerService ) { }

  apiHandler(methodType, url, requestObj) {
    switch (methodType) {
      case HttpMethod.POST:
        return this.apiService.commonPostHandler(url, requestObj);
      case HttpMethod.LOGIN_POST:
        return this.apiService.commonLoginHandler(url, requestObj);
      case HttpMethod.PUT:
        return this.apiService.commonPutHandler(url, requestObj);
      case HttpMethod.DELETE:
        return this.apiService.commonDeleteHandler(url);
      case HttpMethod.GET:
        return this.apiService.commonGetHandler(url);
        case HttpMethod.FORM_POST:
        return this.apiService.commonPostFormDataHandler(url,requestObj);
        default:
          return this.apiService.commonPostFormDataHandler(url,requestObj);
    }
  }
  commonApiCallforAlert(url, methodType, requestObj, callBack) {
  
    // console.log(url);
    this.apiHandler(methodType, url, requestObj).subscribe(
      (res) => {
        if (
          !this.apiService.checkNullOrUndefined(res) &&
          res.hasOwnProperty('response')
        ) {
          if (res.hasOwnProperty('isSuccess') && res.isSuccess) {
            if (methodType != HttpMethod.GET) {
              this.getMessages(res, AlertInfo.SUCCESS);
            }
            callBack(res.response, true);
          } else if (res.hasOwnProperty('isSuccess') && !res.isSuccess) {
            this.getMessages(res, AlertInfo.WARNING);
            callBack(res.response, false);
          }
        }
      },
      (error) => {
        callBack(null, false);
        this.alertService.showMessage(AlertInfo.ERROR, error);
      }
    );
  }

    // common Post Api need to use in all screens

  commonApiCall(url, methodType, requestObj, callBack) {
  
    this.spinner.show();
    // console.log(url);
    this.apiHandler(methodType, url, requestObj).subscribe(
      (res) => {
        if (
          !this.apiService.checkNullOrUndefined(res) &&
          res.hasOwnProperty('response')
        ) {
          if (res.hasOwnProperty('isSuccess') && res.isSuccess) {
            if (methodType != HttpMethod.GET) {
              this.getMessages(res, AlertInfo.SUCCESS);
            }
            this.spinner.hide();
            callBack(res.response, true);
          } else if (res.hasOwnProperty('isSuccess') && !res.isSuccess) {
            this.getMessages(res, AlertInfo.WARNING);
            this.spinner.hide();
            callBack(res.response, false);
          }
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        callBack(null, false);
        this.alertService.showMessage(AlertInfo.ERROR, error);
      }
    );
  }

  private getMessages(res: any, type) {
    if (
      !this.apiService.checkNullOrUndefined(res.endUserMessage) &&
      res.endUserMessage != ''
    ) {
      this.alertService.showMessage(type, res.endUserMessage);
    }
  }
}
