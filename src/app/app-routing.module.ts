import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'visualizar-processo',
        loadChildren: () =>
            import('./feature/pages/visualizar-processo/visualizar-processo.module').then(
                (m) => m.VisualizarProcessoModule
            )
    },
    { path: '', redirectTo: 'visualizar-processo', pathMatch: 'full' },
    {
        path: '**',
        loadChildren: () =>
            import('./feature/pages/pagina-nao-encontrada/pagina-nao-encontrada.module').then(
                (m) => m.PaginaNaoEncontradaModule
            )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
