/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UrlUtilService } from '../services/url-util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private urlUtilService: UrlUtilService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                () => {},
                (error: HttpErrorResponse) => {
                    if (error && (error.status === 401 || error.status === 302)) {
                        this.urlUtilService.redirectToLogin();
                    }
                }
            )
        );
    }
}
