import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarFormComponent } from './editar-form.component';

const routes: Routes = [
    {
        path: 'editar/:id',
        component: EditarFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditarRoutingModule {}
