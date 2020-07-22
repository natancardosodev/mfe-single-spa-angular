import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoadingGlobalModule } from '@voxtecnologia/vox-preload';
import { AlertModule, AlertConfirmModule } from 'lib-alert';
import { HeaderModule } from 'lib-header';
import { MenuModule } from 'lib-menu';
import { FooterModule } from 'footer';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbsModule } from './core/components/breadcrumbs/breadcrumbs.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvService } from './services/env.service';
import { CommonService } from './core/services/common.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        LoadingGlobalModule,
        FontAwesomeModule,
        AlertModule,
        AlertConfirmModule,
        BreadcrumbsModule,
        HeaderModule,
        MenuModule,
        FooterModule
    ],
    providers: [EnvService, CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
