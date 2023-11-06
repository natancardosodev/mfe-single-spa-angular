import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarFormComponent } from './editar-form/editar-form.component';
import { GridTableComponent } from './grid-table/grid-table.component';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa/visualizar-pesquisa.component';
import { VisualizarProcessoComponent } from './visualizar-processo.component';

const routes: Routes = [
    {
        path: '',
        component: VisualizarProcessoComponent,
        children: [
            { path: '', component: GridTableComponent },
            { path: 'editar/:id', component: EditarFormComponent },
            { path: 'visualizar/:id', component: VisualizarPesquisaComponent }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisualizarProcessoRoutingModule {}
