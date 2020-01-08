import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Subscription, forkJoin } from 'rxjs';
import { LoadingGlobalService } from '@voxtecnologia/vox-preload';
import { Menu } from 'lib-menu';
import { LogoInterface } from 'lib-header';

import { AlertMessage } from './util/alert-message';
import { UrlUtilService } from './services/url-util.service';
import { UsuarioLogadoInterface } from './interfaces/usuario-logado.interface';
import { SystemInterface } from './interfaces/system.interfece';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public funcionalidade: string;
  public idUsuario: Subject<number>;
  private $sistema: SystemInterface[];
  private $usuario: UsuarioLogadoInterface;
  private $urlLogo: string;
  private $dataSistema: string;
  private $urlLogoSistema: LogoInterface;
  private $itensMenu: Menu[];

  constructor(
    private alertMessage: AlertMessage,
    private userService: UserService,
    private urlUtilService: UrlUtilService,
    private loadingGlobal: LoadingGlobalService
  ) {
    this.idUsuario = new Subject();
    this.$urlLogoSistema = { url: 'assets/images/sigfacil.png', alt: 'string' };
  }

  public ngOnInit(): void {
    this.getSystemInfo();
    this.loadingGlobal.show();
    this.userService.logarService();
  }

  public ngOnDestroy(): void {
    this.getSystemInfo().unsubscribe();
    this.userService.logarService().unsubscribe();
  }

  public get sistema(): SystemInterface[] {
    return this.$sistema;
  }

  public get usuario(): UsuarioLogadoInterface {
    return this.$usuario;
  }

  public get urlLogo(): string {
    return this.$urlLogo;
  }

  public get urlLogout(): string {
    return this.urlUtilService.redirectToLogout();
  }

  public get urlLogoSistema(): LogoInterface {
    return this.$urlLogoSistema;
  }

  public get dataSistema(): string {
    return this.$dataSistema;
  }

  public get itensMenu(): Array<Menu> {
    return this.$itensMenu;
  }

  public getFuncionalidadeAtual(funcionalidadeAtual: any): void {
    this.funcionalidade = funcionalidadeAtual;
  }

  private getSystemInfo(): Subscription {
    return forkJoin([
      this.userService.getUserInfo(),
      this.userService.getSystem(),
      this.userService.getTime(),
      this.userService.getPathLogo(),
      this.userService.getModulos()
    ]).subscribe(([user, system, data, path, itensMenu]) => {
      this.loadingGlobal.hide();
      this.$dataSistema = data;
      this.$usuario = user;
      this.$sistema = system;
      this.$urlLogo = path;
      this.$itensMenu = itensMenu;
    },
      (error: any) => {
        if (!error.naoAutorizado) {
          this.loadingGlobal.hide();
          this.alertMessage.alert(error.message, 'danger');
        }
      });
  }
}
