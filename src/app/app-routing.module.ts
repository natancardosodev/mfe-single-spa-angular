import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotasEnum } from './core/enums/rotas.enum';

const appRoutes: Routes = [
    {
        path: RotasEnum.VISUALIZARPROCESSO,
        loadChildren: () =>
            import('./feature/pages/visualizar-processo/visualizar-processo.module').then(
                (m) => m.VisualizarProcessoModule
            )
    },
    { path: '', redirectTo: RotasEnum.VISUALIZARPROCESSO, pathMatch: 'full' },
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
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'corrected'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
