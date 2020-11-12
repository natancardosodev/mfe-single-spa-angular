/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingGlobalService } from '@voxtecnologia/vox-preload';

import { Subject, Subscription, forkJoin } from 'rxjs';
import * as sha512 from 'js-sha512';
import { Menu } from 'lib-menu';
import { LogoInterface } from 'lib-header';
import { isUndefined } from 'util';

import { StorageUtil } from './core/utils/storage.util';
import { UrlUtilService } from './core/services/url-util.service';
import { CommonService } from './core/services/common.service';
import { UserService } from './core/services/user.service';
import { SystemInterface } from './core/interfaces/interno/system-interface';
import { User } from './core/interfaces/interno/user-interface';
import { Storage } from './core/enums/storage.enum';
import { FuncionalidadeEnum } from './core/enums/funcionalidade.enum';
import { RotasEnum } from './core/enums/rotas.enum';
import { ExternalFilesService } from './core/services/external-files.service';
import { EnvService } from './core/services/env.service';
import { AlertService } from './core/services/alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public funcionalidade: string;
    public idUsuario: Subject<number>;
    private _sistema: SystemInterface[];
    private _usuario: User;
    private _urlLogo: string;
    private _dataSistema: string;
    private _urlLogoSistema: LogoInterface;
    private _itensMenu: Menu[];

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private urlUtilService: UrlUtilService,
        private externalFiles: ExternalFilesService,
        private envService: EnvService,
        private loadingGlobal: LoadingGlobalService,
        private commonService: CommonService,
        private router: Router
    ) {
        this.idUsuario = new Subject();
        this._urlLogoSistema = { url: 'assets/images/sigfacil.png', alt: 'string' };
    }

    public ngOnInit(): void {
        this.loadingGlobal.show();
        this.logarService();
    }

    public ngOnDestroy(): void {
        this.getSystemInfo('').unsubscribe();
        this.logarService().unsubscribe();
    }

    public get sistema(): SystemInterface[] {
        return this._sistema;
    }

    public get usuario(): User {
        return this._usuario;
    }

    public get urlLogo(): string {
        return this._urlLogo;
    }

    public get urlApi(): string {
        return this.urlUtilService.getUrlApiBase();
    }

    public get subDomain(): string {
        return this.envService.subDomain;
    }

    public get urlLogoSistema(): LogoInterface {
        return this._urlLogoSistema;
    }

    public get dataSistema(): string {
        return this._dataSistema;
    }

    public get itensMenu(): Array<Menu> {
        return this._itensMenu;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public getFuncionalidadeAtual(funcionalidadeAtual: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.funcionalidade = funcionalidadeAtual;
    }

    public logarService(): Subscription {
        return this.userService.getUser().subscribe(
            (response: User) => {
                StorageUtil.store(Storage.DADOS_USUARIO, response);
                this.getSystemInfo(response);
                // this.commonService.getAllOptions(); @todo ajustar rotas do commonService
                // this.carregarJarvis(response.cpf, response.id); @todo Caso use o jarvis

                return isUndefined(response['mensagem']) || this.urlUtilService.redirectToLogin();
            },
            (error) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return error.naoAutorizado && this.urlUtilService.redirectToLogin();
            }
        );
    }

    private getSystemInfo(dadosUsuario): Subscription {
        return forkJoin([
            this.userService.getSystem(),
            this.userService.getTime(),
            this.userService.getPathLogo(),
            this.userService.getModulos()
        ]).subscribe(
            ([system, data, path, itensMenu]) => {
                this.loadingGlobal.hide();
                this._dataSistema = data;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this._usuario = dadosUsuario;
                this._sistema = system;
                this._urlLogo = path;
                this._itensMenu = itensMenu;
                this.validaPermissaoFuncionalidade(this._usuario);
                this.externalFiles.loadCss(`${this.envService.assetsSigfacil}/css/interno/theme.css`);
            },
            (error: any) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (!error.naoAutorizado) {
                    this.loadingGlobal.hide();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    this.alertService.openModal('Erro', error.message, 'danger');
                }
            }
        );
    }

    /**
     * Validação a partir das rotas principais, desconsiderando as subrotas que deve-se colocar no RotasEnum
     * Verifica-se o id da funcionalidade em comum.s_sistema_funcionalidade que deve-se colocar no FuncionalidadeEnum
     * @param dadosUsuario
     */
    private validaPermissaoFuncionalidade(dadosUsuario: User) {
        const permissao = JSON.stringify(this.itensMenu);
        const rota = this.router.url.split('/')[1].toUpperCase();

        if (
            (this.router.url.includes(RotasEnum[rota]) && !permissao.includes(String(FuncionalidadeEnum[rota]))) ||
            dadosUsuario.papel.length == 0
        ) {
            this.alertService.openModal('', 'Acesso Negado', 'danger');
            setTimeout(() => {
                window.location.href = this.urlUtilService.getUrlSigfacil();
            }, 1000);
        }
    }

    private carregarJarvis(cpf: string, id: number): void {
        let hash = `${cpf}${id}`;
        hash = sha512.sha512(hash.toString());
        StorageUtil.store(Storage.JARVIS, hash);
    }
}
