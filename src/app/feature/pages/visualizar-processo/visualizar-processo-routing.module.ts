import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarProcessoComponent } from './visualizar-processo.component';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa/visualizar-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: VisualizarProcessoComponent
    },
    {
        path: ':id',
        component: VisualizarPesquisaComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisualizarProcessoRoutingModule {}
