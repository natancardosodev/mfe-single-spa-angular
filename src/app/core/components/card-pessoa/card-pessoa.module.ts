import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibVoxUiModule } from 'lib-vox-ui';
import { SharedModule } from '@shared/shared.module';
import { CardPessoaComponent } from './card-pessoa.component';

@NgModule({
    declarations: [CardPessoaComponent],
    imports: [CommonModule, SharedModule, LibVoxUiModule],
    exports: [CardPessoaComponent]
})
export class CardPessoaModule {}
