import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionalidadeComponent } from './funcionalidade.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionalidadeComponent
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./visualizar-pesquisa/visualizar-pesquisa.module').then(m => m.VisualizarPesquisaModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionalidadeRoutingModule { }
