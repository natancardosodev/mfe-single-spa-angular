import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'nova-funcionalidade',
        loadChildren: () =>
            import('./feature/pages/funcionalidade/funcionalidade.module').then((m) => m.FuncionalidadeModule)
    },
    { path: '', redirectTo: 'nova-funcionalidade', pathMatch: 'full' },
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
export class AppRoutingModule {}
