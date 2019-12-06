import { CardDocumentosService } from './../../services/card-documentos.service';
import { Component, OnInit } from '@angular/core';
import { AnexosConfig, ExtensaoArquivoEnum } from 'vox-upload';
import { UrlUtilService } from 'src/app/services/url-util.service';

@Component({
  selector: 'app-card-documentos',
  templateUrl: './card-documentos.component.html',
  styleUrls: ['./card-documentos.component.scss']
})
export class CardDocumentosComponent implements OnInit {

  public anexosConfig: AnexosConfig | any;
  public hasArquivoAnexado: boolean;
  public nri: string;

  private $titleUpload: string;

  constructor(
    private urlUtilService: UrlUtilService,
    private cardDocumentosService: CardDocumentosService
  ) {
    this.$titleUpload = 'Documentos';
    this.anexosConfig = {
      listaAnexos: [],
      apiUrl: ''
    };
  }

  ngOnInit() {
    this.onAnexarCardOpen();
  }

  public get titleUpload(): string {
    return this.$titleUpload;
  }

  public onArquivoAnexado(hasArquivos: any) {
    this.hasArquivoAnexado = hasArquivos;
  }

  public onAnexarCardOpen() {
    this.cardDocumentosService.getAnexosDocumentos().subscribe(
      (response) => {
          response = response.map(res => {
            res.tipo = '1';
            res.nriProtocolo = this.nri;
            res.browser = window.navigator.userAgent;
            return res;
          });
          this.anexosConfig = {
            listaAnexos: response,
            apiUrl: this.urlUtilService.mountUrl(''),
            apiAnexoUrl: this.urlUtilService.mountUrl(`/upload`),
            formato: [ExtensaoArquivoEnum.PDF],
            nriProtocolo: this.nri,
            tamanho: 2
          };
      },
      (erro) => this.anexosConfig = {
              listaAnexos: erro,
              apiUrl: ''
          }
      );
  }

}
