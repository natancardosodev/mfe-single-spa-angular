/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription, forkJoin } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import * as sha512 from 'js-sha512';
import { AlertService, LoadingGlobalService, LogoInterface, Menu, MenuFuncionalidade } from 'lib-ui-interno';

import { StorageUtil } from '@core/utils/storage.util';
import { UrlUtilService } from '@core/services/url-util.service';
import { UserService } from '@core/services/user.service';
import { SystemInterface } from '@core/interfaces/interno/system-interface';
import { User } from '@core/interfaces/interno/user-interface';
import { Storage } from '@core/enums/storage.enum';
import { FuncionalidadeEnum } from '@core/enums/funcionalidade.enum';
import { RotasEnum } from '@core/enums/rotas.enum';
import { ExternalFilesService } from '@core/services/external-files.service';
import { EnvService } from '@core/services/env.service';
import { delay, isNullOrUndefined } from '@core/utils/generals.util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    public funcionalidadeAtual: MenuFuncionalidade;
    public funcionalidadesDoProjeto: Array<number> = [];
    public assetsSigfacil: string;
    public userKey: string;
    public baseHref: string;
    public tipoModulo: string;
    private _sistema: Array<SystemInterface>;
    private _usuario: User;
    private _urlLogo: string;
    private _dataSistema: string;
    private _urlLogoSistema: LogoInterface;
    private _itensMenu: Array<Menu>;

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private urlUtilService: UrlUtilService,
        private externalFiles: ExternalFilesService,
        private title: Title,
        private envService: EnvService,
        private loadingGlobal: LoadingGlobalService,
        private router: Router
    ) {
        this._urlLogoSistema = { url: 'assets/images/sigfacil.png', alt: 'string' };
        this.userKey = Storage.DADOS_USUARIO;
        this.baseHref = RotasEnum.BASE_HREF;
        this.assetsSigfacil = this.envService.assetsSigfacil;
    }

    public ngOnInit(): void {
        this.logarService();
        this.loadingFuncionalidadesDoProjeto();
    }

    public ngAfterViewInit(): void {
        this.loadingGlobal.show();
    }

    public ngAfterViewChecked(): void {
        this.title.setTitle(this.funcionalidadeAtual ? this.funcionalidadeAtual.nome : '');
    }

    public ngOnDestroy(): void {
        this.getSystemInfo('').unsubscribe();
        this.logarService().unsubscribe();
    }

    public get sistema(): Array<SystemInterface> {
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

    public logarService(): Subscription {
        return this.userService
            .getUser()
            .pipe(take(1))
            .subscribe(
                (response: User) => {
                    StorageUtil.store(Storage.DADOS_USUARIO, response);
                    // this.commonService.loadingAllOptions(); @todo Caso use o common
                    // this.carregarJarvis(response.cpf, response.id); @todo Caso use o jarvis
                    this.getSystemInfo(response);

                    return isNullOrUndefined(response['mensagem']) || this.urlUtilService.redirectToLogin();
                },
                (error) => {
                    return error.naoAutorizado && this.urlUtilService.redirectToLogin();
                }
            );
    }

    public updateFuncionalidade(funcionalidade: MenuFuncionalidade): void {
        this.funcionalidadeAtual = funcionalidade;
    }

    private loadingFuncionalidadesDoProjeto(): void {
        Object.keys(FuncionalidadeEnum).map((item) => {
            if (parseInt(item) >= 0) {
                this.funcionalidadesDoProjeto.push(parseInt(item));
            }
        });
    }

    private getSystemInfo(dadosUsuario): Subscription {
        return forkJoin([
            this.userService.getSystem(),
            this.userService.getTime(),
            this.userService.getPathLogo(),
            this.userService.getModulos(),
            this.userService.getManifest()
        ])
            .pipe(
                finalize(
                    () =>
                        void (async () => {
                            await delay(1000);
                            this.loadingGlobal.hide();
                        })()
                ),
                take(1)
            )
            .subscribe(
                ([system, data, path, itensMenu, manifest]) => {
                    this.externalFiles.loadCss('/styles/interno/theme', this.assetsSigfacil, manifest.hash);
                    this._dataSistema = data;
                    this._sistema = system;
                    this._urlLogo = path;
                    this._itensMenu = itensMenu;
                    setTimeout(() => {
                        this._usuario = dadosUsuario;
                        this.validaPermissaoFuncionalidade(this._usuario);
                    }, 1000);
                },
                (error: any) => {
                    if (!error.naoAutorizado) {
                        this.alertService.openModal({ title: 'Erro', message: error.message, style: 'danger' });
                    }
                }
            );
    }

    /**
     * Validação a partir das rotas principais, desconsiderando as subrotas que deve-se colocar no RotasEnum
     * Verifica-se o id da funcionalidade em comum.s_sistema_funcionalidade que deve-se colocar no FuncionalidadeEnum
     * Define o breadcrumb pela funcionalidade atual
     * @param dadosUsuario
     */
    private validaPermissaoFuncionalidade(dadosUsuario: User) {
        const permissao = JSON.stringify(this.itensMenu);
        const rotaFormatada = (() => {
            const rota = this.router.url.replace(/[0-9]|-/g, '').split('/');
            return rota.length > 2 ? `${rota[1]}${rota[2]}` : `${rota[1]}`;
        })().toUpperCase();

        this.setFuncionalidadeBreadcrumb(this.itensMenu, rotaFormatada);

        if (
            this.router.url.includes(RotasEnum[rotaFormatada]) &&
            !permissao.includes(String(FuncionalidadeEnum[rotaFormatada])) &&
            !dadosUsuario.papel.toString().includes(String(FuncionalidadeEnum[rotaFormatada]))
        ) {
            this.alertService.openModal({ title: 'Erro', message: 'Acesso Negado', style: 'danger' });
            setTimeout(() => {
                window.location.href = this.urlUtilService.getUrlSigfacil(true);
            }, 1000);
        }
    }

    private setFuncionalidadeBreadcrumb(itensMenu: Array<Menu>, keyEnumRotaInicial: string = null) {
        const keyEnumRota = keyEnumRotaInicial
            ? keyEnumRotaInicial
            : this.router.url.replace(/-/g, '').split('/')[1].toUpperCase();

        itensMenu.forEach((menu) => {
            menu.funcionalidades.forEach((func) => {
                if (FuncionalidadeEnum[keyEnumRota] === func.id) {
                    this.funcionalidadeAtual = func;
                }
            });
        });
    }

    private carregarJarvis(cpf: string, id: number): void {
        let hash = `${cpf}${id}`;
        hash = sha512.sha512(hash.toString());
        StorageUtil.store(Storage.JARVIS, hash);
    }
}
