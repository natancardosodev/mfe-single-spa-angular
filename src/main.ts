import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Sentry from '@sentry/angular-ivy';

import { UFsLiberadas } from '@core/configs/mapeamento-servicos';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { montarUrlPortais } from 'lib-vox-shared-codes';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

const ambientesWithSentry = [
    'deve-um',
    'deve-dois',
    'deve-tres',
    'deve-quatro',
    'deve-cinco',
    'deve-seis',
    'deve-sete',
    'deve-oito',
    'deve-nove',
    'deve-dez',
    'homologacao',
    'demo',
    'www'
];
const principaisEnvs = ['homologacao', 'demo', 'www'];
const dataEHora = new Date().toString().split(' ').join('-').slice(4, 18);

if (ambientesWithSentry.includes(environment.uri.subDomain)) {
    Sentry.init({
        dsn: 'COLOCAR-URL-DSN-DO-SENTRY-FRONT', // solicitar cadastro a equipe de configuração
        integrations: [
            new Sentry.BrowserTracing({
                tracePropagationTargets: [montarUrlPortais(ambientesWithSentry, UFsLiberadas, RotasEnum.BASE_HREF)],
                routingInstrumentation: Sentry.routingInstrumentation
            }),
            new Sentry.Replay()
        ],
        release: `${environment.uri.subDomain}-${dataEHora}`,
        environment: environment.uri.subDomain,
        ignoreErrors: ['Erro da API'],
        tracesSampleRate: principaisEnvs.includes(environment.uri.subDomain) ? 0.8 : 0.4,
        replaysSessionSampleRate: principaisEnvs.includes(environment.uri.subDomain) ? 0.7 : 0.3
    });
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => window.console.error(err));
