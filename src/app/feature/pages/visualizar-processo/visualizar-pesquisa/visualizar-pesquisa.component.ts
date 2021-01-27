import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Status } from 'src/app/core/enums/status.enum';
import { ModalIndeferirComponent } from 'src/app/core/components/modal-indeferir/modal-indeferir.component';
import { CardObservacaoComponent } from 'src/app/core/components/card-observacao/card-observacao.component';
import { UserService } from 'src/app/core/services/user.service';
import { Storage } from 'src/app/core/enums/storage.enum';
import { StorageUtil } from 'src/app/core/utils/storage.util';
import { FuncionalidadeEnum } from 'src/app/core/enums/funcionalidade.enum';
import { PapeisEnum } from 'src/app/core/enums/papeis.enum';

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
        private userService: UserService,
        private modalService: BsModalService
    ) {
        this.loading = true;
        this.isStatusExigencia = false;
        this.route.params.subscribe((params) => (this.solicitacao = params['id']));
    }

    public get hasAcessoInserir(): boolean {
        return this.userService.checkPermissaoLiberada(
            StorageUtil.get(Storage.DADOS_USUARIO),
            FuncionalidadeEnum.EMPRESA,
            [PapeisEnum.INSERIR]
        );
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

    public finalizandoProcesso(success: boolean): void {
        this.loading = false;
        this.closeModal();

        if (success) {
            window.console.log('Sucesso');
        }
    }
}
