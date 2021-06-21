import { Component, OnInit, Input } from '@angular/core';

import { finalize, take } from 'rxjs/operators';

import { DadosPessoaInterface } from '@core/interfaces/pessoa-fisica/dados-pessoa-interface';
import { SolicitacaoService } from '@feature/services/solicitacao.service';

@Component({
    selector: 'app-card-pessoa',
    templateUrl: './card-pessoa.component.html',
    styleUrls: ['./card-pessoa.component.scss']
})
export class CardPessoaComponent implements OnInit {
    @Input() public solicitacao: number;
    public pessoa: DadosPessoaInterface;
    public loading: boolean;
    public isCollapsed: boolean;

    constructor(private solicitacaoService: SolicitacaoService) {
        this.loading = true;
        this.isCollapsed = false;
    }

    public ngOnInit(): void {
        this.solicitacaoService
            .getDadosPessoa({ solicitacao: this.solicitacao })
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                take(1)
            )
            .subscribe((response: DadosPessoaInterface) => {
                this.pessoa = response;
            });
    }
}
