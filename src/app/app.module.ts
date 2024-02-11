import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import * as Sentry from '@sentry/angular-ivy';

import { GlobalErrorHandler } from '@core/interceptor/global-error-handler';
import { EmptyRouteComponent } from '@feature/pages/empty-route/empty-route.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, EmptyRouteComponent],
    imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule],
    providers: [
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: false
            })
        },
        {
            provide: Sentry.TraceService,
            deps: [Router]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}
