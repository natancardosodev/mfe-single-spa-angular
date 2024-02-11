import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as Sentry from '@sentry/angular-ivy';

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
            new Sentry.BrowserTracing({
                tracePropagationTargets: [],
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
