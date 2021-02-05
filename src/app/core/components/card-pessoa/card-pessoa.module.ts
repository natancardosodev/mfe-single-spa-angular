import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibUIModule } from 'lib-ui-interno';
import { MaskPipe } from '../../pipes/mask.pipe';
import { CardPessoaComponent } from './card-pessoa.component';

@NgModule({
    declarations: [CardPessoaComponent, MaskPipe],
    imports: [CommonModule, LibUIModule],
    exports: [CardPessoaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardPessoaModule {}
