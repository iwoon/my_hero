import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, finalize, delay, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${environment.endpoint}/api/v1/${req.url}`
    const urlReq = req.clone({ url });

    return next.handle(urlReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 201) {
            console.log(JSON.stringify(event, null, 2));
            console.log(`Status Code: ${event.status}`);
          }
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            this.authService.removeToken();
            this.router.navigate(["/"]);
          }
        }
      }),
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse) {
          switch (httpErrorResponse.status) {
            case 400:
              const error = httpErrorResponse.error;
              if (error.errors) {
                alert(error.errors);
              } else {
                alert(error.title);
              }
              break;
            case 401:
              this.authService.removeToken();
              this.router.navigate(['/login']);
              break;
          }
        }
        return throwError(httpErrorResponse);
      }),
      delay(1000),
      finalize(() => {
        //todo
      })
    );
  }
}