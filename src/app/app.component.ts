import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import * as sha512 from 'js-sha512';
import { Menu, MenuFuncionalidade } from 'lib-menu';
import { LogoInterface } from 'lib-header';
import { AlertService, LoadingGlobalService } from 'lib-ui-interno';

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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public funcionalidade: MenuFuncionalidade;
    public idUsuario: Subject<number>;
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
                    this.carregarJarvis(response.cpf, response.id);
                    this.getSystemInfo(response);
                    this.commonService.getAllOptions();

                    return typeof response['mensagem'] === 'undefined' || this.urlUtilService.redirectToLogin();
                },
                (error) => {
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
        ])
            .pipe(take(1))
            .subscribe(
                ([system, data, path, itensMenu]) => {
                    this._dataSistema = data;
                    this._usuario = dadosUsuario;
                    this._sistema = system;
                    this._urlLogo = path;
                    this._itensMenu = itensMenu;
                    this.validaPermissaoFuncionalidade(this._usuario);
                    this.removeDuplicidadeFuncionalidades();
                    this.externalFiles.loadCss(`${this.envService.assetsSigfacil}/css/interno/theme.css`);
                    this.loadingGlobal.hide();
                },
                (error: any) => {
                    if (!error.naoAutorizado) {
                        this.loadingGlobal.hide();
                        this.alertService.openModal({ title: 'Erro', message: error.message, style: 'danger' });
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
        const rotaInicial = this.router.url.replace(/-/g, '').split('/')[1].toUpperCase() || 'EMPRESA'; // @todo funcionalidade base

        this.itensMenu.forEach((menu) => {
            menu.funcionalidades.forEach((func) => {
                if (FuncionalidadeEnum[rotaInicial] === func.id) {
                    this.funcionalidade = func;
                }
            });
        });

        if (
            (this.router.url.includes(RotasEnum[rotaInicial]) &&
                !permissao.includes(String(FuncionalidadeEnum[rotaInicial]))) ||
            dadosUsuario.papel.length == 0
        ) {
            this.alertService.openModal({ title: 'Erro', message: 'Acesso Negado', style: 'danger' });
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

    /**
     * Remove a duplicidade do link ao clicar no menu lateral para com funcionalidades do mesmo projeto
     */
    private removeDuplicidadeFuncionalidades(): void {
        this._itensMenu = this.itensMenu.map((item: Menu) => {
            let index = 0;
            item.funcionalidades.map((funcionalidade) => {
                if (funcionalidade.rota.match(RotasEnum.BASE)) {
                    const teste = funcionalidade.rota.replace(RotasEnum.BASE + '/', '');
                    item.funcionalidades[index].rota = teste;
                }
                index++;

                return funcionalidade;
            });
            if (item.funcionalidades.length === index) {
                return item;
            }
        });
    }
}
