import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalComponent } from 'lib-vox-ui';
import { take } from 'rxjs/operators';

import { CardObservacaoComponent } from '@core/components/card-observacao/card-observacao.component';
import { ModalIndeferirComponent } from '@core/components/modal-indeferir/modal-indeferir.component';
import { FuncionalidadeEnum } from '@core/enums/interno/funcionalidade.enum';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { UserPermissoes } from '@core/interfaces/interno/user-interface';
import { ComponentBase } from '@core/models/component-base';
import { UserService } from '@core/services/user.service';
import { navigate } from '@core/utils/generals.util';

@Component({
    selector: 'app-visualizar-pesquisa',
    templateUrl: './visualizar-pesquisa.component.html',
    styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent extends ComponentBase implements OnInit {
    @ViewChild(CardObservacaoComponent) observacao: CardObservacaoComponent;
    @ViewChild(ModalIndeferirComponent) modalIndeferir: ModalIndeferirComponent;
    @ViewChild('modalDeferir') modalDeferir: ModalComponent;
    public isLoading: boolean;
    public solicitacao: number;
    public isStatusExigencia: boolean;

    constructor(
        private titleService: Title,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        super();
        this.isLoading = false;
        this.isStatusExigencia = false;
        this.route.params.pipe(take(1)).subscribe((params) => {
            this.solicitacao = params['id'];
        });
    }

    public get permissoes(): UserPermissoes {
        return this.userService.getPermissoesByFuncionalidade(FuncionalidadeEnum.VISUALIZARPROCESSO);
    }

    ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
    }

    public voltarParaPesquisa(): void {
        navigate(this.router, RotasEnum.VISUALIZARPROCESSO);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public statusAtualProcesso(status: number): void {}

    public openModalDeferir(): void {
        this.modalDeferir.openModal();
    }

    public deferir(): void {
        this.isLoading = true;
        this.observacao.salvar();
    }

    public openModalIndeferir(): void {
        this.modalIndeferir.openModal({ modalName: 'modalIndeferir' });
    }

    public finalizandoProcesso(success: boolean): void {
        this.isLoading = false;
        this.closeModal();

        if (success) {
            window.console.log('Sucesso');
        }
    }

    public redirectAlterarDados(): void {
        navigate(this.router, RotasEnum.VISUALIZARPROCESSO_EDITAR, this.solicitacao);
    }
}
