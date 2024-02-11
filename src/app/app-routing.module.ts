import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from '@feature/pages/empty-route/empty-route.component';

const appRoutes: Routes = [
    { path: 'micro-ng', loadChildren: () => import('./feature/pages/home/home.module').then((m) => m.HomeModule) },
    {
        path: 'micro-ng/:equipe',
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
