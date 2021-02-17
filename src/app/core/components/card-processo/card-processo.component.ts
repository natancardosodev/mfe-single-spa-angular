import { Component, OnInit, Input } from '@angular/core';

import { finalize, take } from 'rxjs/operators';

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

    public ngOnInit(): void {
        this.solicitacaoService
            .getDadosProcesso({ solicitacao: this.solicitacao })
            .pipe(
                finalize(() => (this.loading = false)),
                take(1)
            )
            .subscribe((response: any) => {
                this.processo = response;
            });
    }
}
