import { Component, OnInit, Input } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';

@Component({
    selector: 'app-card-processo',
    templateUrl: './card-processo.component.html',
    styleUrls: ['./card-processo.component.scss']
})
export class CardProcessoComponent implements OnInit {
    @Input() public solicitacao: number;
    public processo: any;
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
            .subscribe((response: any) => {
                // @todo Colocar interface para tipo
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.processo = response;
            });
    }
}