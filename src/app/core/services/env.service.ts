import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    public get api(): string {
        return environment.uri.api;
    }

    public get projeto(): string {
        return environment.uri.projeto;
    }

    public get jarvis(): string {
        return environment.uri.jarvis;
    }

    public get oauth(): string {
        return environment.uri.oauth;
    }

    public get assetsSigfacil(): string {
        return environment.uri.assetsSigfacil;
    }

    public get enviromment(): string {
        return environment.uri.environments;
    }

    public get subDomain(): string {
        return environment.uri.subDomain;
    }
}
