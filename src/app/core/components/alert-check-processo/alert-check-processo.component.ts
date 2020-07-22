import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { LeiloeiroInterface } from '../../interfaces/leiloeiro.interface';
import { UsuarioLogadoInterface } from '../../interfaces/usuario-logado.interface';
import { StorageUtil } from '../../utils/storage.util';

@Component({
    selector: 'app-alert-check-processo',
    templateUrl: './alert-check-processo.component.html',
    styleUrls: ['./alert-check-processo.component.scss']
})
export class AlertCheckProcessoComponent {
    @ViewChild('acompanhar', { static: false }) acompanhar: ElementRef;
    public modalRef: BsModalRef;
    private _protocolo: string;
    private _usuarioLogado: UsuarioLogadoInterface;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private router: Router,
        private modalService: BsModalService
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this._usuarioLogado = StorageUtil.get('user');
    }

    public hasSolicitacao(): void {
        this.solicitacaoService.getSolicitacaoPorCpf(this._usuarioLogado.cpf).subscribe(
            (success: LeiloeiroInterface) => {
                if (success.protocolo) {
                    this._protocolo = success.protocolo;
                    const config: Record<string, boolean> = {
                        ignoreBackdropClick: true
                    };
                    setTimeout(() => {
                        this.openModal(this.acompanhar, config);
                    }, 500);

                    return;
                }

                void this.router.navigateByUrl('cadastrar');
            },
            (error) => {
                window.console.error(error);
            }
        );
    }

    public visualizarProcessoExistente(): void {
        this.solicitacaoService
            .getProcesso({
                protocolo: this._protocolo,
                cpf: this._usuarioLogado.cpf
            })
            .subscribe(
                (success: any) => {
                    StorageUtil.store('processo', success);
                    void this.router.navigateByUrl('acompanhar');
                    this.closeModal();
                },
                (error) => {
                    window.console.error(error);
                }
            );
    }

    public openModal(template: ElementRef<any>, config?: Record<string, boolean>): void {
        this.modalRef = this.modalService.show(template, config);
    }

    public closeModal(): void {
        this.modalRef.hide();
    }
}
