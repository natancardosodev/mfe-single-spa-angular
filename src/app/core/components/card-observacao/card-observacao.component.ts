import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { finalize, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { ObservacaoForm } from './observacao.form';

@Component({
    selector: 'app-card-observacao',
    templateUrl: './card-observacao.component.html',
    styleUrls: ['./card-observacao.component.scss']
})
export class CardObservacaoComponent implements OnInit {
    @Input() public solicitacao: number;
    @Input() public statusAtualProcesso: number;
    @Output() public finalizandoProcesso: EventEmitter<any>;
    public loading: boolean;
    public observacoes$: Observable<any>;
    private _observacaoForm: ObservacaoForm;

    constructor(private solicitacaoService: SolicitacaoService) {
        this.loading = true;
        this._observacaoForm = new ObservacaoForm();
        this.finalizandoProcesso = new EventEmitter();
    }

    public ngOnInit(): void {
        this.observacoes$ = this.solicitacaoService.getObservacao({ solicitacao: this.solicitacao });
        this.loading = false;
    }

    public get observacaoForm(): ObservacaoForm {
        return this._observacaoForm;
    }

    public salvar(): void {
        this.loading = true;
        this.solicitacaoService
            .putIndeferir(this.solicitacao, this.observacaoForm.getDados())
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                take(1)
            )
            .subscribe(
                () => {
                    this.finalizandoProcesso.emit(true);
                },
                () => {
                    this.finalizandoProcesso.emit(false);
                }
            );
    }
}
