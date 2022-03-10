import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { UrlUtilService } from '@core/services/url-util.service';

@Component({
    selector: 'app-card-documentos',
    templateUrl: './card-documentos.component.html',
    styleUrls: ['./card-documentos.component.scss']
})
export class CardDocumentosComponent implements OnInit {
    @Input() public solicitacao: number;
    public documentos$: Observable<any>;
    public path: any;
    public loading: boolean;

    constructor(private solicitacaoService: SolicitacaoService, private urlUtilService: UrlUtilService) {
        this.loading = true;
    }

    public ngOnInit(): void {
        this.documentos$ = this.solicitacaoService.getDadosDocumento({ solicitacao: this.solicitacao });
        this.loading = false;
    }

    public getDownloadDocumento(id: number, isAnexo: boolean): string {
        const anexo = isAnexo ? 1 : 0;

        return this.urlUtilService.montarUrlApi(`/download-documento/${id}/${anexo}`);
    }
}
