import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TextMaskModule } from 'angular2-text-mask';

import { CadastrarComponent } from './cadastrar.component';
import { CadastrarRoutingModule } from './cadastrar.routing.module';
import { TitlePageModule } from 'src/app/core/components/title-page/title-page.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlertCheckProcessoModule } from 'src/app/core/components/alert-check-processo/alert-check-processo.module';

@NgModule({
    declarations: [CadastrarComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CadastrarRoutingModule,
        TitlePageModule,
        TextMaskModule,
        SharedModule,
        AlertCheckProcessoModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot()
    ]
})
export class CadastrarModule {}
