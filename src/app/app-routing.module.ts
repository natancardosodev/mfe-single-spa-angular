import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'nova-funcionalidade',
    loadChildren: () => import('./pages/funcionalidade/funcionalidade.module').then(m => m.FuncionalidadeModule),
  },
  { path: '',  redirectTo: 'nova-funcionalidade', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
