import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this._snackBar.open('Unauthorized!!', 'close', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }else if([500].indexOf(err.status) !== -1){
          this._snackBar.open('Internal Server Error!', 'close', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });

        }else{
          this._snackBar.open('Something Went Wrong!', 'close', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
        // throwError
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
