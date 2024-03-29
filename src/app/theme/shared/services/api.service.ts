import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appconfig } from "../enums/http-handler";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}
  commonLoginHandler(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }
  commonPostHandler(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.requestHeaders);
  }
  commonPostFormDataHandler(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.requestFormHeaders);
  }
  commonGetHandler(url: string): Observable<any> {
    return this.http.get(url, this.requestHeaders);
  }

  commonPutHandler(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.requestHeaders);
  }
  commonPutFormDataHandler(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.requestFormHeaders);
  }

  commonDeleteHandler(url: string): Observable<any> {
    return this.http.delete(url, this.requestHeaders);
  }

   //to check null or undefined
   checkNullOrUndefined(val) {
    if (val === null || val === undefined) {
      return true;
    } else {
      return false;
    }
  }

  protected get requestHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
   
    const currentUser = JSON.parse(localStorage.getItem(Appconfig.CURRENTUSER));
    let token =
      currentUser != null ? "Bearer " + currentUser.access_token : null;
    if (token != null) {
      const headers = new HttpHeaders({
        Authorization: token,
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      });
      return { headers };
    } else {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      });
      return { headers };
    }
  }
  protected get requestFormHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
    const currentUser = JSON.parse(localStorage.getItem(Appconfig.CURRENTUSER));
    let token = "Bearer" + currentUser.access_token;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return { headers };
  }
}
