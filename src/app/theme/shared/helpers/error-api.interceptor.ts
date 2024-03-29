import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorAPIInterceptor implements HttpInterceptor {

  constructor(private appService: AppService,private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {

                this.appService.logOut();
                
                this.router.navigate(['auth/login']);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
