import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { RotasEnum } from './core/enums/interno/rotas.enum';

const appRoutes: Routes = [
    { path: '', loadChildren: () => import('./feature/pages/home/home.module').then((m) => m.HomeModule) },
    { path: ':equipe', loadChildren: () => import('./feature/pages/view/view.module').then((m) => m.ViewModule) },
    {
        path: '**',
        loadChildren: () =>
            import('./feature/pages/pagina-nao-encontrada/pagina-nao-encontrada.module').then(
                (m) => m.PaginaNaoEncontradaModule
            )
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
