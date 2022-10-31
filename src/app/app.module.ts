import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { LibVoxUiModule } from 'lib-vox-ui';
import * as Sentry from '@sentry/angular';

import { GlobalErrorHandler } from '@core/interceptor/global-error-handler';
import { SharedModule } from '@shared/shared.module';
import { AuthInterceptor } from '@core/interceptor/auth.interceptor';
import { JarvisInterceptor } from '@core/interceptor/jarvis.interceptor';
import { CommonService } from '@core/services/common.service';
import { UserService } from '@core/services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ModalModule.forRoot(),
        SharedModule,
        LibVoxUiModule.forRoot({ theme: 'interno' })
    ],
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
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JarvisInterceptor,
            multi: true
        },
        CommonService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}
