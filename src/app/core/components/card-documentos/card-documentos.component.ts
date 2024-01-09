/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ComponentBase } from '@core/models/component-base';
import { UrlUtilService } from '@core/services/url-util.service';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { MaskPipe } from '@shared/pipes/mask.pipe';
import { TableItemInterface } from 'lib-vox-ui/lib/core';
import { finalize, take } from 'rxjs/operators';

@Component({
    selector: 'app-card-documentos',
    templateUrl: './card-documentos.component.html',
    styleUrls: ['./card-documentos.component.scss']
})
export class CardDocumentosComponent extends ComponentBase implements OnInit {
    @Input() public solicitacao: number;
    public tableData: Array<Array<TableItemInterface>>;
    public documentos$: Observable<any>;
    public path: any;
    public loading: boolean;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private urlUtilService: UrlUtilService
    ) {
        super();
        this.loading = true;
    }

    public ngOnInit(): void {
        this.getDadosDocumento();
    }

    public getDadosDocumento() {
        this.solicitacaoService
            .getDadosDocumento({ solicitacao: this.solicitacao })
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                take(1)
            )
            .subscribe((response) => {
                if (response) {
                    this.tableData = this.convertResponseToTableData(response);
                }
            });
    }

    private convertResponseToTableData(response: any): Array<Array<TableItemInterface>> {
        return response.map((data) => {
            const mask = new MaskPipe();
            const lineTable: Array<TableItemInterface> = [
                {
                    label: data.id?.toString(),
                    isHidden: true
                },
                {
                    label: data.nome
                },
                {
                    label: mask.transform(data.data_cadastro, 'dateBR')
                },
                {
                    label: 'Ações',
                    actions: [
                        {
                            type: 'button',
                            icon: 'trash',
                            enfase: 'terciary',
                            circle: true,
                            classExtras: 'color-icon',
                            action: 'getDownloadDocumento',
                            value: { id: data.id, anexo: data.is_anexo }
                        }
                    ]
                }
            ];
            return lineTable;
        });
    }

    public getDownloadDocumento({ id, isAnexo }): string {
        const anexo = isAnexo ? 1 : 0;

        return this.urlUtilService.montarUrlApi(`/download-documento/${id}/${anexo}`);
    }
}
