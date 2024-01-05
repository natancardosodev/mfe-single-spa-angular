import { Injectable } from '@angular/core';
import { buildDomainRedesim } from 'lib-vox-shared-codes';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    public get api(): string {
        return buildDomainRedesim(environment.uri.api);
    }

    public get projeto(): string {
        return buildDomainRedesim(environment.uri.projeto);
    }

    public get jarvis(): string {
        return buildDomainRedesim(environment.uri.jarvis);
    }

    public get oauth(): string {
        return buildDomainRedesim(environment.uri.oauth);
    }

    public get assetsSigfacil(): string {
        return buildDomainRedesim(environment.uri.assetsSigfacil);
    }

    public get enviromment(): string {
        return buildDomainRedesim(environment.uri.environments);
    }

    public get subDomain(): string {
        return buildDomainRedesim(environment.uri.subDomain);
    }
}
