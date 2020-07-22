import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { UrlUtilService } from './url-util.service';
import { UsuarioLogadoInterface } from '../interfaces/usuario-logado.interface';
import { HttpUtil } from '../utils/http-util';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private $user: Observable<UsuarioLogadoInterface>;
    private $setUserInfo: Subject<UsuarioLogadoInterface>;

    constructor(private http: HttpClient /*, private urlUtilService: UrlUtilService*/) {
        this.$setUserInfo = new Subject();
        this.$user = this.$setUserInfo.asObservable();
    }

    /**
     * serviço que busca o usuário logado
     * @returns {Observable<UserService>}
     * @memberof UsuarioService
     */
    public getUser(): Observable<UsuarioLogadoInterface> {
        const url = 'https://deve-cdn-sigfacil.voxtecnologia.com.br/assets/configs/mocky-me.json'; // Substituir pela url da API, exemplo abaixo
        //const url = this.urlUtilService.mountUrl('/me');
        return this.http
            .get<UsuarioLogadoInterface>(url, { withCredentials: false, responseType: 'json' }) // trocar para true estando com a url da api
            .pipe<UsuarioLogadoInterface>(catchError((error: HttpErrorResponse) => HttpUtil.tratarErroLogin(error)));
    }

    /**
     *
     * @returns
     * @memberof UserService
     */
    public getUserInfo(): Observable<UsuarioLogadoInterface> {
        return this.$user;
    }
}
