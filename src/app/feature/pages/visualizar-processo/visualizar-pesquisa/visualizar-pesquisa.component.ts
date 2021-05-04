import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'lib-ui-interno';
import { take } from 'rxjs/operators';

import { ModalIndeferirComponent } from '@core/components/modal-indeferir/modal-indeferir.component';
import { CardObservacaoComponent } from '@core/components/card-observacao/card-observacao.component';
import { Status } from '@core/enums/status.enum';
import { UserService } from '@core/services/user.service';
import { Storage } from '@core/enums/storage.enum';
import { StorageUtil } from '@core/utils/storage.util';
import { FuncionalidadeEnum } from '@core/enums/funcionalidade.enum';
import { PapeisEnum } from '@core/enums/papeis.enum';
import { RotasEnum } from '@core/enums/rotas.enum';
import { GeneralsUtil } from '@core/utils/generals.util';

@Component({
    selector: 'app-visualizar-pesquisa',
    templateUrl: './visualizar-pesquisa.component.html',
    styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent implements OnInit {
    @ViewChild(CardObservacaoComponent, { static: false }) observacao: CardObservacaoComponent;
    @ViewChild(ModalIndeferirComponent, { static: false }) modalIndeferir: ModalIndeferirComponent;
    @ViewChild('modalDeferir', { static: false }) modalDeferir: ModalComponent;
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
        this.route.params.pipe(take(1)).subscribe((params) => (this.solicitacao = params['id']));
    }

    public get hasAcessoInserir(): boolean {
        return this.userService.checkPermissaoLiberada(
            StorageUtil.get(Storage.DADOS_USUARIO),
            FuncionalidadeEnum.EMPRESA,
            [PapeisEnum.INSERIR]
        );
    }

    public get hasAcessoAlterar(): boolean {
        return this.userService.checkPermissaoLiberada(
            StorageUtil.get(Storage.DADOS_USUARIO),
            FuncionalidadeEnum.EMPRESA,
            [PapeisEnum.ALTERAR]
        );
    }

    ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
        window.scrollTo(0, 0);
    }

    public voltarParaPesquisa(): void {
        GeneralsUtil.navigate(this.router, RotasEnum.EMPRESA);
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
        this.modalDeferir.openModal();
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

    public redirectAlterarDados(): void {
        GeneralsUtil.navigate(this.router, RotasEnum.EMPRESA_EDITAR, this.solicitacao);
    }
}
