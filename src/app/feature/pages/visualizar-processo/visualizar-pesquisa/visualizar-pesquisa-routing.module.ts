import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';

const routes: Routes = [
    {
        path: 'visualizar/:id',
        component: VisualizarPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisualizarPesquisaRoutingModule {}
