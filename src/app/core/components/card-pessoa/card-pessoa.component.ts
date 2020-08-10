import { Component, OnInit, Input } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { DadosPessoaInterface } from '../../interfaces/pessoa-fisica/dados-pessoa-interface';

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
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((response: DadosPessoaInterface) => {
                this.pessoa = response;
            });
    }
}
