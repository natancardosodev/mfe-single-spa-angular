import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoadingGlobalModule } from '@voxtecnologia/vox-preload';
import { HeaderModule } from 'lib-header';
import { MenuModule } from 'lib-menu';
import { FooterModule } from 'footer';
import { BreadcrumbsModule } from './core/components/breadcrumbs/breadcrumbs.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './core/services/common.service';
import { UserService } from './core/services/user.service';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { SharedModule } from './shared/shared.module';
// import { JarvisInterceptor } from './core/interceptor/jarvis.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LoadingGlobalModule,
        FontAwesomeModule,
        ModalModule.forRoot(),
        BreadcrumbsModule,
        HeaderModule,
        MenuModule,
        FooterModule,
        SharedModule
    ],
    providers: [
        CommonService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
        // { provide: HTTP_INTERCEPTORS, useClass: JarvisInterceptor, multi: true } @todo caso tenha jarvis
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
