import { Component, OnInit, Input } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { DadosProcessoInterface } from '../../interfaces/dados-processo/dados-processo-interface';

@Component({
    selector: 'app-card-processo',
    templateUrl: './card-processo.component.html',
    styleUrls: ['./card-processo.component.scss']
})
export class CardProcessoComponent implements OnInit {
    @Input() public solicitacao: number;
    public processo: DadosProcessoInterface;
    public loading: boolean;
    public isCollapsed: boolean;

    constructor(private solicitacaoService: SolicitacaoService) {
        this.loading = true;
        this.isCollapsed = false;
    }

    ngOnInit(): void {
        this.solicitacaoService
            .getDadosProcesso({ solicitacao: this.solicitacao })
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((response: DadosProcessoInterface) => {
                this.processo = response;
            });
    }
}
