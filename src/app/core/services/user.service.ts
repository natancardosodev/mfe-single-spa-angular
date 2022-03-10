import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Menu } from 'lib-ui-interno';

import { tratarErroLogin } from '@core/utils/generals.util';
import { User, UserPermissoes } from '@core/interfaces/interno/user-interface';
import { SystemInterface } from '@core/interfaces/interno/system-interface';
import { UrlUtilService } from './url-util.service';
import { StorageUtil } from '@core/utils/storage.util';
import { Storage } from '@core/enums/storage.enum';
import { HoraMocky } from './hora-mocky';
import { TiposApisEnum } from '@core/enums/tipo-apis.enum';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _checkModuloMenu: Subject<any>;
    private _user: Observable<User>;
    private _setUserInfo: Subject<User>;

    constructor(private http: HttpClient, private urlUtilService: UrlUtilService) {
        this._setUserInfo = new Subject();
        this._checkModuloMenu = new Subject();
        this._user = this._setUserInfo.asObservable();
    }

    public getManifest(): Observable<any> {
        const url = this.urlUtilService.montarUrlApi(
            `/manifest.json?v=${new Date().toISOString()}`,
            null,
            TiposApisEnum.ASSETS_SIGFACIL
        );

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe<any>(catchError((error: HttpErrorResponse) => tratarErroLogin(error)));
    }

    /**
     * serviço que busca o usuário logado
     * @returns {Observable<UserService>}
     * @memberof UsuarioService
     */
    public getUser(): Observable<User> {
        // const url = this.urlUtilService.montarUrlApi('/me');
        const url = this.urlUtilService.montarUrlApi('/me', null, TiposApisEnum.MOCK);

        return this.http
            .get<User>(url, { withCredentials: true, responseType: 'json' })
            .pipe(
                catchError((erro: HttpErrorResponse) => {
                    return tratarErroLogin(erro);
                })
            );
    }

    /**
     *
     * @returns
     * @memberof UserService
     */
    public getUserInfo(): Observable<User> {
        return this._user;
    }

    /**
     * Retorna a logo da entidade
     * @returns {Observable<string>}
     * @memberof UserService
     */
    public getPathLogo(): Observable<any> {
        // const url = this.urlUtilService.montarUrlApi('/me/logo-entidade');
        const url = this.urlUtilService.montarUrlApi('/logo', null, TiposApisEnum.MOCK);

        return this.http.get(url, { withCredentials: true, responseType: 'text' }).pipe(
            catchError((erro: HttpErrorResponse) => {
                return tratarErroLogin(erro);
            })
        );
    }

    /**
     *
     * @returns {(Observable<string>)}
     * @memberof TimeService
     */
    public getTime(): Observable<string> {
        // return this.http
        //     .get<string>(this.urlUtilService.montarUrlApi('/hora'), { withCredentials: true, responseType: 'json' })
        //     .pipe(
        //         catchError((erro: HttpErrorResponse) => {
        //             return tratarErroLogin(erro);
        //         })
        //     );
        return of(HoraMocky.data);
    }

    /**
     * Retorna os sistemas disponíveis para o usuário
     * @returns {Observable<SystemInterface[]>}
     * @memberof SystemAvailableService
     */
    public getSystem(): Observable<Array<SystemInterface>> {
        // const url = this.urlUtilService.montarUrlApi('/me/sistema');
        const url = this.urlUtilService.montarUrlApi('/sistema', null, TiposApisEnum.MOCK);

        return this.http
            .get<Array<SystemInterface>>(url, {
                withCredentials: true,
                responseType: 'json'
            })
            .pipe(
                catchError((erro: HttpErrorResponse) => {
                    return tratarErroLogin(erro);
                })
            );
    }

    /**
     *
     * @returns {Observable<Menu[]>}
     *
     * @memberof UserService
     */
    public getModulos(): Observable<Array<Menu>> {
        // const url = this.urlUtilService.montarUrlApi('/me/menu/4');
        const url = this.urlUtilService.montarUrlApi('/modulos', null, TiposApisEnum.MOCK); // remover ", null, TiposApisEnum.MOCK"

        return this.http
            .get<Array<Menu>>(url, {
                withCredentials: true,
                responseType: 'json'
            })
            .pipe(
                map((modulo) => {
                    this._checkModuloMenu.next(modulo);
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
        const roles = Object.values(StorageUtil.get(Storage.DADOS_USUARIO)['papel'])
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
