import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { StorageUtil } from '../utils/storage.util';
import { Storage } from '../enums/storage.enum';
import { EnvService } from '../services/env.service';

@Injectable()
export class JarvisInterceptor implements HttpInterceptor {
    constructor(private envService: EnvService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const token: string = StorageUtil.get(Storage.JARVIS);
        const jarvisUrl = `${this.envService.jarvis}/me`;

        if (token && req.url == jarvisUrl) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token).set('content-type', 'application/json')
            });
        }

        return next.handle(req);
    }
}
