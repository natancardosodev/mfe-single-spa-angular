import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibUIModule } from 'lib-ui-interno';
import { CardPessoaComponent } from './card-pessoa.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [CardPessoaComponent],
    imports: [CommonModule, SharedModule, LibUIModule],
    exports: [CardPessoaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardPessoaModule {}
