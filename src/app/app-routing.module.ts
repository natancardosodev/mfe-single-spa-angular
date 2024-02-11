import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { EmptyRouteComponent } from '@feature/pages/empty-route/empty-route.component';

const baseHref = RotasEnum.BASE_HREF.split('/')[1];

const appRoutes: Routes = [
    { path: baseHref, loadChildren: () => import('./feature/pages/home/home.module').then((m) => m.HomeModule) },
    {
        path: baseHref + '/:equipe',
        loadChildren: () => import('./feature/pages/view/view.module').then((m) => m.ViewModule)
    },
    {
        path: '**',
        component: EmptyRouteComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule {}
