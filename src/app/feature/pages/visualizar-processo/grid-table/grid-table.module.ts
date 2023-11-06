import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridModule } from 'grid';
import { PesquisaFormModule } from '../pesquisa-form/pesquisa-form.module';
import { GridTableComponent } from './grid-table.component';

@NgModule({
    declarations: [GridTableComponent],
    imports: [CommonModule, PesquisaFormModule, GridModule],
    exports: [GridTableComponent]
})
export class GridTableModule {}
