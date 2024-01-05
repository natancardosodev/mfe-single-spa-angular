import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Menu } from 'lib-vox-ui/lib/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AlertService, tratarErroLogin } from 'lib-vox-ui';

import { StorageEnum } from '@core/enums/sistema/storage.enum';
import { SystemInterface } from '@core/interfaces/interno/system-interface';
import { UserInterface, UserPermissoes } from '@core/interfaces/interno/user-interface';
import { StorageUtil } from '@core/utils/storage.util';

import { TiposApisEnum } from 'lib-vox-shared-codes';
import { BaseService } from './base.service';
import { HoraMocky } from './hora-mocky';
import { UrlUtilService } from './url-util.service';

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
