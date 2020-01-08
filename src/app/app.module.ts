import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LoadingGlobalModule } from '@voxtecnologia/vox-preload';
import { AlertModule, AlertConfirmModule } from 'lib-alert';
import { HeaderModule } from 'lib-header';
import { MenuModule } from 'lib-menu';
import { FooterModule } from 'footer';
import { BreadcrumbsModule } from './components/breadcrumbs/breadcrumbs.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvService } from './services/env.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LoadingGlobalModule,
    AlertModule,
    AlertConfirmModule,
    BreadcrumbsModule,
    HeaderModule,
    MenuModule,
    FooterModule
  ],
  providers: [
    EnvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
