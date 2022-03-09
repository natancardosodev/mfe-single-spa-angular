import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// import { map, catchError } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Menu } from 'lib-ui-interno';

import { tratarErroLogin } from '@core/utils/generals.util';
import { User, UserPermissoes } from '@core/interfaces/interno/user-interface';
import { UserMocky } from '@core/mockys/interno/user-mocky';
import { PathLogoMocky } from '@core/mockys/interno/path-logo-mocky';
import { SystemInterface } from '@core/interfaces/interno/system-interface';
import { HoraMocky } from '@core/mockys/interno/hora-mocky';
import { SystemMocky } from '@core/mockys/interno/system-mocky';
import { ModulosMocky } from '@core/mockys/interno/modulos-mocky';
import { UrlUtilService } from './url-util.service';
import { StorageUtil } from '@core/utils/storage.util';
import { Storage } from '@core/enums/storage.enum';

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
        const url = this.urlUtilService.mountUrlAssets(`/manifest.json?v=${new Date().toISOString()}`);

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
        // const url = this.urlUtilService.mountUrl('/me');
        // return this.http
        //     .get<User>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message))));
        // @todo retirar comentários quando a api estiver integrada, a funcionalidade cadastrada no banco e o usuário habilitado
        return of(UserMocky.data);
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
        // const url = this.urlUtilService.mountUrl('/me/logo-entidade');
        // return this.http.get(url, { withCredentials: true, responseType: 'text' }).pipe(
        //     catchError((erro: HttpErrorResponse) => {
        //         if (erro.status === 404) {
        //             return throwError({ naoAutorizado: true });
        //         }
        //         return throwError(new Error(erro.error.message));
        //     })
        // );
        return of(PathLogoMocky.data);
    }

    /**
     *
     * @returns {(Observable<string>)}
     * @memberof TimeService
     */
    public getTime(): Observable<string> {
        // const url = this.urlUtilService.mountUrl('/hora');
        // return this.http
        //     .get<string>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message))));
        return of(HoraMocky.data);
    }

    /**
     * Retorna os sistemas disponíveis para o usuário
     * @returns {Observable<SystemInterface[]>}
     * @memberof SystemAvailableService
     */
    public getSystem(): Observable<Array<SystemInterface>> {
        // const url = this.urlUtilService.mountUrl('/me/sistema');
        // return this.http
        //     .get<Array<SystemInterface>>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message))));
        return of(SystemMocky.data);
    }

    /**
     *
     * @returns {Observable<Menu[]>}
     *
     * @memberof UserService
     */
    public getModulos(): Observable<Array<Menu>> {
        // const url = this.urlUtilService.mountUrl('/me/menu/4');
        // return this.http
        //     .get<Array<Menu>>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(
        //         map((modulo) => {
        //             this._checkModuloMenu.next(modulo);
        //             return modulo.filter((moduloMenu) => this.setModulos(moduloMenu));
        //         }),
        //         catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message)))
        //     );
        return of(ModulosMocky.data);
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
