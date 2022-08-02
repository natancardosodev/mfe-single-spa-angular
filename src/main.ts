import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { montarUrlPortais } from '@core/utils/generals.util';

import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

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
        dsn: 'COLOCAR-URL-DSN-DO-SENTRY-FRONT',
        integrations: [
            new Integrations.BrowserTracing({
                tracingOrigins: [montarUrlPortais(ambientesWithSentry, RotasEnum.BASE_HREF)],
                routingInstrumentation: Sentry.routingInstrumentation
            })
        ],
        release: `${environment.uri.subDomain}-${dataEHora}`,
        environment: environment.uri.subDomain,
        ignoreErrors: ['Erro da API'],
        tracesSampleRate: principaisEnvs.includes(environment.uri.subDomain) ? 0.8 : 0.4
    });
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => window.console.error(err));
