import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize, take } from 'rxjs/operators';

import { ComponentBase } from '@core/models/component-base';
import { ModalComponent } from 'lib-vox-ui';
import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { IndeferirForm } from './indeferir.form';

@Component({
    selector: 'app-modal-indeferir',
    templateUrl: './modal-indeferir.component.html',
    styleUrls: ['./modal-indeferir.component.scss']
})
export class ModalIndeferirComponent extends ComponentBase implements OnInit {
    @Input() public solicitacao: number;
    @Output() public finalizandoIndeferir: EventEmitter<any>;
    public modalOpened: ModalComponent;
    public loading: boolean;
    private _indeferirForm: IndeferirForm;

    constructor(private solicitacaoService: SolicitacaoService) {
        super();
        this.loading = true;
        this.finalizandoIndeferir = new EventEmitter();
        this._indeferirForm = new IndeferirForm();
    }

    public ngOnInit(): void {
        this.loading = false;
    }

    public get indeferirForm(): IndeferirForm {
        return this._indeferirForm;
    }

    public confirmarIndeferir(): void {
        this.indeferirForm.markAllAsTouched();
        if (this.indeferirForm.valid) {
            this.loading = true;
            this.solicitacaoService
                .putIndeferir(this.solicitacao, this.indeferirForm.getDadosEnvioIndeferir())
                .pipe(
                    finalize(() => {
                        this.loading = false;
                        this.closeModal();
                    }),
                    take(1)
                )
                .subscribe(
                    () => {
                        this.finalizandoIndeferir.emit(true);
                    },
                    () => {
                        this.finalizandoIndeferir.emit(false);
                    }
                );
        }
    }
}
