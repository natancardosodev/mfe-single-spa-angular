import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'lib-vox-ui';

@Component({
    selector: 'app-modal-confirmacao',
    templateUrl: './modal-confirmacao.component.html'
})
export class ModalConfirmacaoComponent implements OnInit {
    @ViewChild('modalConfirmacao', { static: false }) private modalConfirmacao: ModalComponent;

    constructor() {}

    ngOnInit(): void {}

    public openModal(modalName: string): void {
        const modal = this[modalName] as ModalComponent;
        modal.openModal();
    }

    public closeModal(modalName: string): void {
        const modal = this[modalName] as ModalComponent;
        modal.openModal();
    }

    // Métodos para usar no component filho
    // @ViewChild(ModaisGeraisComponent) modaisGerais: ModaisGeraisComponent;
    // public openModalConfirmacao() {
    //     this.modaisGerais.openModal('modalConfirmacao');
    // }
}
