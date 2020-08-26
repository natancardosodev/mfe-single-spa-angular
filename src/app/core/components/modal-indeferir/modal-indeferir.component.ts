import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { IndeferirForm } from './indeferir.form';
import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';

@Component({
    selector: 'app-modal-indeferir',
    templateUrl: './modal-indeferir.component.html',
    styleUrls: ['./modal-indeferir.component.scss']
})
export class ModalIndeferirComponent implements OnInit {
    @Input() public solicitacao: number;
    @ViewChild('modalIndeferir', { static: false }) modal: ElementRef;
    @Output() public finalizandoIndeferir: EventEmitter<any>;
    public loading: boolean;
    public isCollapsed: boolean;
    public modalRef: BsModalRef;
    private _indeferirForm: IndeferirForm;

    constructor(private solicitacaoService: SolicitacaoService, private modalService: BsModalService) {
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

    public get modalIndeferir(): ElementRef {
        return this.modal;
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
                    })
                )
                .subscribe(
                    () => {
                        this.closeModal();
                        this.finalizandoIndeferir.emit(true);
                    },
                    (error) => {
                        this.closeModal();
                        this.finalizandoIndeferir.emit(false);
                        window.console.error(error);
                    }
                );
        }
    }

    public openModal(): void {
        const config: Record<string, any> = {
            ignoreBackdropClick: true,
            class: 'modal-lg'
        };
        this.loading = false;
        this.modalRef = this.modalService.show(this.modal, config);
    }

    public closeModal(): void {
        this.modalRef.hide();
    }

    public isFieldValid(form: FormGroup, field: string): boolean {
        return !form.get(field).valid && form.get(field).dirty;
    }
}
