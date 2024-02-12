import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    public get api(): string {
        return environment.uri.api;
    }

    public get oauth(): string {
        return environment.uri.oauth;
    }

    public get cdn(): string {
        return environment.uri.cdn;
    }

    public get subDomain(): string {
        return environment.uri.subDomain;
    }
}
