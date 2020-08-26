import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Status } from 'src/app/core/enums/status.enum';
import { ModalIndeferirComponent } from 'src/app/core/components/modal-indeferir/modal-indeferir.component';
import { CardObservacaoComponent } from 'src/app/core/components/card-observacao/card-observacao.component';

@Component({
    selector: 'app-visualizar-pesquisa',
    templateUrl: './visualizar-pesquisa.component.html',
    styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent implements OnInit {
    @ViewChild(CardObservacaoComponent, { static: false }) observacao: CardObservacaoComponent;
    @ViewChild(ModalIndeferirComponent, { static: false }) modalIndeferir: ModalIndeferirComponent;
    @ViewChild('modalDeferir', { static: false }) modalDeferir: ElementRef;
    public loading: boolean;
    public modalRef: BsModalRef;
    public solicitacao: number;
    public isStatusExigencia: boolean;

    constructor(
        private titleService: Title,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: BsModalService
    ) {
        this.loading = true;
        this.isStatusExigencia = false;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
        this.route.params.subscribe((params) => (this.solicitacao = params['id']));
    }

    ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
        window.scrollTo(0, 0);
    }

    public voltarParaPesquisa(): void {
        window.scrollTo(0, 0);
        void this.router.navigate(['']);
    }

    public statusAtualProcesso(status: number): void {
        setTimeout(() => {
            this.isStatusExigencia = status == Status.EXIGENCIA ? true : false;
        }, 500);
    }

    public openModal(modal: ElementRef): void {
        this.loading = false;
        this.modalRef = this.modalService.show(modal);
    }

    public closeModal(): void {
        if (this.modalRef) {
            this.modalRef.hide();
        }
    }

    public openModalDeferir(): void {
        this.openModal(this.modalDeferir);
    }

    public deferir(): void {
        this.loading = true;
        this.observacao.salvar();
    }

    public openModalIndeferir(): void {
        this.modalIndeferir.openModal();
    }
}
