import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'lib-ui-interno';
import { take } from 'rxjs/operators';

import { ModalIndeferirComponent } from '@core/components/modal-indeferir/modal-indeferir.component';
import { CardObservacaoComponent } from '@core/components/card-observacao/card-observacao.component';
import { UserService } from '@core/services/user.service';
import { FuncionalidadeEnum } from '@core/enums/funcionalidade.enum';
import { RotasEnum } from '@core/enums/rotas.enum';
import { navigate } from '@core/utils/generals.util';
import { UserPermissoes } from '@core/interfaces/interno/user-interface';

@Component({
    selector: 'app-visualizar-pesquisa',
    templateUrl: './visualizar-pesquisa.component.html',
    styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent implements OnInit {
    @ViewChild(CardObservacaoComponent) observacao: CardObservacaoComponent;
    @ViewChild(ModalIndeferirComponent) modalIndeferir: ModalIndeferirComponent;
    @ViewChild('modalDeferir') modalDeferir: ModalComponent;
    public isLoading: boolean;
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
        this.isLoading = false;
        this.isStatusExigencia = false;
        this.route.params.pipe(take(1)).subscribe((params) => {
            this.solicitacao = params['id'];
        });
    }

    public get permissoes(): UserPermissoes {
        return this.userService.getPermissoesByFuncionalidade(FuncionalidadeEnum.EMPRESA);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
    }

    public voltarParaPesquisa(): void {
        navigate(this.router, RotasEnum.EMPRESA);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public statusAtualProcesso(status: number): void {}

    public openModal(modal: ElementRef): void {
        this.isLoading = false;
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
        this.isLoading = true;
        this.observacao.salvar();
    }

    public openModalIndeferir(): void {
        this.modalIndeferir.openModal();
    }

    public finalizandoProcesso(success: boolean): void {
        this.isLoading = false;
        this.closeModal();

        if (success) {
            window.console.log('Sucesso');
        }
    }

    public redirectAlterarDados(): void {
        navigate(this.router, RotasEnum.EMPRESA_EDITAR, this.solicitacao);
    }
}
