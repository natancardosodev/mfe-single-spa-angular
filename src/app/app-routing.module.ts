import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'funcionalidade',
    loadChildren: () => import('./pages/funcionalidade/funcionalidade.module').then(m => m.FuncionalidadeModule),
  },
  { path: '',  redirectTo: 'funcionalidade', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
