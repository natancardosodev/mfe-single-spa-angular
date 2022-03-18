import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EnvService } from '@core/services/env.service';
import { StorageUtil } from '@core/utils/storage.util';
import { StorageEnum } from '@core/enums/sistema/storage.enum';

@Injectable()
export class JarvisInterceptor implements HttpInterceptor {
    constructor(private envService: EnvService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = StorageUtil.get(StorageEnum.JARVIS);
        const jarvisUrl = this.envService.jarvis;

        if (token && req.url.indexOf(jarvisUrl) !== -1) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token).set('content-type', 'application/json')
            });
        }

        return next.handle(req);
    }
}
