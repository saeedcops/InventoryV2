import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      catchError(error => {
        if (error) {
         // this.toastr.error(error.error.detail, error.error.status);
          if (error.status === 400) {
            if (error.error.errors) {
              // console.log(error);
              this.toastr.error(error.error.errors.Detail[0], error.error.statusCode);

              //throw error.error
            } else {
             // console.log(error);
              this.toastr.error(error.errors.detail, error.error.statusCode);

            }
          } 

          if (error.status === 401) {
            this.toastr.error(error.error.detail, error.error.statusCode);
            console.log(error.error.massage);


          }

          if (error.status === 404) {
            this.toastr.error(error.error.detail, error.error.statusCode);
           // this.router.navigateByUrl('/not-found');
          }

          if (error.status === 500) {
            this.toastr.error(error.error, error.status);

            //const navigation: NavigationExtras = { state: { error: error.error } };
           // this.router.navigateByUrl('/server-error', navigation);
            console.log(error);

          }
        }
        return throwError(error);
      })
    );
  }
}
