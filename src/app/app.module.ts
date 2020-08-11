import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { LoadingGlobalModule } from '@voxtecnologia/vox-preload';
import { AlertModule, AlertConfirmModule } from 'lib-alert';
import { HeaderModule } from 'lib-header';
import { MenuModule } from 'lib-menu';
import { FooterModule } from 'footer';
import { BreadcrumbsModule } from './core/components/breadcrumbs/breadcrumbs.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './core/services/common.service';

import { VisualizarProcessoModule } from './feature/pages/visualizar-processo/visualizar-processo.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LoadingGlobalModule,
        FontAwesomeModule,
        AlertModule,
        AlertConfirmModule,
        BreadcrumbsModule,
        HeaderModule,
        MenuModule,
        FooterModule,
        VisualizarProcessoModule
    ],
    providers: [CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
