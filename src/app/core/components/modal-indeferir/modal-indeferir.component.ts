import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'lib-ui-interno';
import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { IndeferirForm } from './indeferir.form';

@Component({
    selector: 'app-modal-indeferir',
    templateUrl: './modal-indeferir.component.html',
    styleUrls: ['./modal-indeferir.component.scss']
})
export class ModalIndeferirComponent implements OnInit {
    @Input() public solicitacao: number;
    @ViewChild('modal', { static: false }) modal: ModalComponent;
    @Output() public finalizandoIndeferir: EventEmitter<any>;
    public loading: boolean;
    public isCollapsed: boolean;
    public modalRef: BsModalRef;
    private _indeferirForm: IndeferirForm;

    constructor(private solicitacaoService: SolicitacaoService) {
        this.loading = true;
        this.isCollapsed = false;
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
                    })
                )
                .subscribe(
                    () => {
                        this.finalizandoIndeferir.emit(true);
                    },
                    (error) => {
                        this.finalizandoIndeferir.emit(false);
                        window.console.error(error);
                    }
                );
        }
    }

    public openModal(): void {
        this.modal.openModal();
    }
    public closeModal(): void {
        this.modal.closeModal();
    }

    public isFieldValid(form: FormGroup, field: string): boolean {
        return !form.get(field).valid && form.get(field).dirty;
    }
}
