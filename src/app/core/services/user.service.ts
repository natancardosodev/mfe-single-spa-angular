import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Menu } from 'lib-vox-ui/lib/core';

import { AlertService } from 'lib-vox-ui';

import { tratarErroLogin } from '@core/utils/generals.util';
import { UserInterface, UserPermissoes } from '@core/interfaces/interno/user-interface';
import { SystemInterface } from '@core/interfaces/interno/system-interface';
import { StorageUtil } from '@core/utils/storage.util';
import { StorageEnum } from '@core/enums/sistema/storage.enum';
import { TiposApisEnum } from '@core/enums/sistema/tipo-apis.enum';

import { UrlUtilService } from './url-util.service';
import { HoraMocky } from './hora-mocky';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    private _checkModuloMenu: Subject<any>;
    private _user: Observable<UserInterface>;
    private _setUserInfo: Subject<UserInterface>;
    private _customOptions: Record<string, any>;

    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('', http, urlUtilService, alertService);
        this._setUserInfo = new Subject();
        this._checkModuloMenu = new Subject();
        this._user = this._setUserInfo.asObservable();
        this._customOptions = {
            withCredentials: true,
            responseType: 'json'
        };
    }

    /**
     * serviço que busca o usuário logado
     * @returns {Observable<UserService>}
     * @memberof UsuarioService
     */
    public getUser(): Observable<UserInterface> {
        return this.get('/me', null, TiposApisEnum.STATIC, null, this._customOptions);
    }

    /**
     *
     * @returns
     * @memberof UserService
     */
    public getUserInfo(): Observable<UserInterface> {
        return this._user;
    }

    /**
     * Retorna a logo da entidade
     * @returns {Observable<string>}
     * @memberof UserService
     */
    public getPathLogo(): Observable<any> {
        // @TODO: trocar por: /me/logo-entidade
        return this.get('/logo', null, TiposApisEnum.STATIC, null, { withCredentials: true, responseType: 'text' });
    }

    /**
     *
     * @returns {(Observable<string>)}
     * @memberof TimeService
     */
    public getTime(): Observable<string> {
        // return this.get('/hora', null, null, null, this._customOptions);
        return of(HoraMocky.data);
    }

    /**
     * Retorna os sistemas disponíveis para o usuário
     * @returns {Observable<SystemInterface[]>}
     * @memberof SystemAvailableService
     */
    public getSystem(): Observable<Array<SystemInterface>> {
        // @TODO: trocar por: /me/sistema
        return this.get('/sistema', null, TiposApisEnum.STATIC, null, this._customOptions);
    }

    /**
     *
     * @returns {Observable<Menu[]>}
     *
     * @memberof UserService
     */
    public getModulos(): Observable<Array<Menu>> {
        // @TODO: trocar por: /me/menu/4
        return this.get('/modulos', null, TiposApisEnum.STATIC, null, this._customOptions).pipe(
            map((modulo) => {
                this._checkModuloMenu.next(modulo);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                return modulo.filter((moduloMenu) => this.setModulos(moduloMenu));
            }),
            catchError((erro: HttpErrorResponse) => {
                return tratarErroLogin(erro);
            })
        );
    }

    /**
     * @param {any} param
     * @returns {Menu}
     * @memberof UserService
     */
    public setModulos(param: any): Menu {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return param.funcionalidades.map((menu) => menu.rota);
    }

    /**
     * @readonly
     * @type {Observable<Menu[]>}
     * @memberof UserService
     */
    public get checkModuloMenu(): Observable<Array<Menu>> {
        return this._checkModuloMenu.asObservable();
    }

    public getPermissoesByFuncionalidade(idFuncionalidade: number): UserPermissoes {
        const roles = Object.values(StorageUtil.get(StorageEnum.DADOS_USUARIO)['papel'])
            .filter((permissao: string) => {
                return permissao.includes(idFuncionalidade.toString()) ? permissao : null;
            })
            .join('');

        return {
            inserir: roles.includes('INSERIR'),
            alterar: roles.includes('ALTERAR'),
            excluir: roles.includes('EXCLUIR'),
            visualizar: roles.includes('VISUALIZAR')
        };
    }
}
