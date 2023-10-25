import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as sha512 from 'js-sha512';
import { AlertService, LoadingGlobalService } from 'lib-vox-ui';
import { LogoInterface, Menu, MenuFuncionalidade } from 'lib-vox-ui/lib/core';
import { Subscription, forkJoin } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { FuncionalidadeEnum } from '@core/enums/interno/funcionalidade.enum';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { StorageEnum } from '@core/enums/sistema/storage.enum';
import { SystemInterface } from '@core/interfaces/interno/system-interface';
import { UserInterface } from '@core/interfaces/interno/user-interface';
import { AssetsService } from '@core/services/assets.service';
import { EnvService } from '@core/services/env.service';
import { ExternalFilesService } from '@core/services/external-files.service';
import { UrlUtilService } from '@core/services/url-util.service';
import { UserService } from '@core/services/user.service';
import { isNullOrUndefined } from '@core/utils/generals.util';
import { StorageUtil } from '@core/utils/storage.util';
import { delay } from 'lib-vox-shared-codes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    public funcionalidadeAtual: MenuFuncionalidade;
    public funcionalidadesDoProjeto: Array<number> = [];
    public assetsSigfacil: string;
    public userKey: string;
    public baseHref: string;
    public tipoModulo: string;
    public sistema: Array<SystemInterface>;
    public usuario: UserInterface;
    public urlApi: string;
    public subDomain: string;
    public urlLogo: string;
    public dataSistema: string;
    public urlLogoSistema: LogoInterface;
    public itensMenu: Array<Menu>;

    constructor(
        private alertService: AlertService,
        private userService: UserService,
        private assetsService: AssetsService,
        private urlUtilService: UrlUtilService,
        private externalFiles: ExternalFilesService,
        private envService: EnvService,
        private loadingGlobal: LoadingGlobalService,
        private router: Router
    ) {
        this.urlLogoSistema = { url: 'assets/images/sigfacil.png', alt: 'string' };
        this.userKey = StorageEnum.DADOS_USUARIO;
        this.baseHref = RotasEnum.BASE_HREF;
        this.assetsSigfacil = this.envService.assetsSigfacil;
        this.urlApi = this.urlUtilService.getUrlApiBase();
        this.subDomain = this.envService.subDomain;
    }

    public ngOnInit(): void {
        this.loadTheme();
        this.logarService();
        this.loadingFuncionalidadesDoProjeto();
    }

    public ngAfterViewInit(): void {
        this.loadingGlobal.show();
    }

    public ngOnDestroy(): void {
        this.loadTheme().unsubscribe();
        this.getSystemInfo('').unsubscribe();
        this.logarService().unsubscribe();
    }

    public logarService(): Subscription {
        return this.userService
            .getUser()
            .pipe(take(1))
            .subscribe(
                (response: UserInterface) => {
                    StorageUtil.store(StorageEnum.DADOS_USUARIO, response);
                    // this.commonService.loadingAllOptions(); // @todo Caso use o common
                    // this.carregarJarvis(response.cpf, response.id); // @todo Caso use o jarvis
                    this.getSystemInfo(response);

                    return isNullOrUndefined(response['message']) || this.urlUtilService.redirectToLogin();
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

    private loadTheme(): Subscription {
        return this.assetsService
            .getManifest()
            .pipe(
                finalize(
                    () =>
                        void (async () => {
                            await delay(500);
                            this.loadingGlobal.hide();
                        })()
                ),
                take(1)
            )
            .subscribe((manifest) => {
                this.externalFiles.loadCss('/fontawesome/css/all.min', this.assetsSigfacil);
                this.externalFiles.loadCss('/styles/interno/theme', this.assetsSigfacil, manifest.hash);
            });
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
                    this.dataSistema = data;
                    this.sistema = system;
                    this.urlLogo = path;
                    this.itensMenu = itensMenu;
                    this.usuario = dadosUsuario;
                    this.validaPermissaoFuncionalidade(this.usuario);
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
    private validaPermissaoFuncionalidade(dadosUsuario: UserInterface) {
        const permissao = JSON.stringify(this.itensMenu);
        const rotaFormatada = (() => {
            const rota = this.router.url.replace(/[0-9]|-/g, '').split('/');
            return rota[1]; // rota.length > 2 ? `${rota[1]}${rota[2]}` : `${rota[1]}`;
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
        StorageUtil.store(StorageEnum.JARVIS, hash);
    }
}
