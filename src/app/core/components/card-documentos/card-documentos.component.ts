import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { UrlUtilService } from '../../services/url-util.service';

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
    public isCollapsed: boolean;

    constructor(private solicitacaoService: SolicitacaoService, private urlUtilService: UrlUtilService) {
        this.loading = true;
        this.isCollapsed = false;
    }

    public ngOnInit(): void {
        this.documentos$ = this.solicitacaoService.getDadosDocumento({ solicitacao: this.solicitacao });
        this.loading = false;
    }

    public getPathDocumento(id: number): void {
        this.solicitacaoService
            .getPathDocumento(id)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((response: any) => {
                // @todo colocar interface para tipo
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.path = response;
            });
    }

    public getDownloadDocumento(id: number, isAnexo: boolean): string {
        const anexo = isAnexo ? 1 : 0;

        return this.urlUtilService.montarUrlApi(`/download-documento/${id}/${anexo}`);
    }
}
