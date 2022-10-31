import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'lib-vox-ui';

import {
    AnexoInterface,
    AtividadeInterface,
    DadosInscricaoInterface,
    DocumentoOrgaoInterface
} from '@core/interfaces/visualizar-processo/dados-inscricao.interface';
import { DadosInterface } from '@core/interfaces/sistema/dados.interface';
import { CommonService } from '@core/services/common.service';
import { TextMaskFactory } from '@core/utils/mask/text-mask-factory';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { JarvisService } from '@feature/services/jarvis.service';
import { clearMask } from '@core/configs/regexClearMask';
import { GatewayReceitaInterface } from '@core/interfaces/jarvis/gateway-receita.interface';
import { MensagensEnum } from '@core/enums/sistema/mensagens.enum';
import { delay, navigate } from '@core/utils/generals.util';
import { FormFieldProdutor, FormLabelProdutor } from '@core/enums/visualizar-processo/form-produtor.enum';
import { ProdutorForm } from './produtor.form';

@Component({
    selector: 'app-editar-form',
    templateUrl: './editar-form.component.html',
    styleUrls: ['./editar-form.component.scss']
})
export class EditarFormComponent implements OnInit {
    public formFieldProdutor = FormFieldProdutor;
    public formLabelProdutor = FormLabelProdutor;
    public loading: boolean;
    public loadingUpdate: boolean;
    public loadingUf: boolean;
    public tipoPessoaFisica: boolean;
    public tipoPessoaJuridica: boolean;
    public atividades: Array<AtividadeInterface>;
    public documentos: Array<DocumentoOrgaoInterface>;
    public anexos: Array<AnexoInterface>;
    public listaMunicipiosImovel: BehaviorSubject<Array<DadosInterface>> = new BehaviorSubject([]);
    public listaMunicipiosProdutor: BehaviorSubject<Array<DadosInterface>> = new BehaviorSubject([]);
    public listaMunicipiosContabilista: BehaviorSubject<Array<DadosInterface>> = new BehaviorSubject([]);
    public tiposPessoaOptions: BehaviorSubject<Array<DadosInterface>> = new BehaviorSubject([]);
    public sexosOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    private _produtorForm: ProdutorForm;
    private _solicitacaoId: number;
    private _maskFactory: TextMaskFactory;

    public get produtorForm(): ProdutorForm {
        return this._produtorForm;
    }

    public get maskFactory(): TextMaskFactory {
        return this._maskFactory;
    }

    public get commonService(): CommonService {
        return this._commonService;
    }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private solicitacaoService: SolicitacaoService,
        private alertService: AlertService,
        private jarvisService: JarvisService,
        private _commonService: CommonService
    ) {
        this._maskFactory = new TextMaskFactory();
        this._produtorForm = new ProdutorForm();
        this.activatedRoute.params.subscribe((params) => {
            this._solicitacaoId = params['id'] ? params['id'] : null;
        });
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
        this.getDadosSolicitacao();
        this.preencherNomeByCpf();
        this.setOptions();
    }

    public getDadosSolicitacao(): void {
        this.loading = true;
        this.solicitacaoService
            .getDadosInscricao(this._solicitacaoId)
            .pipe(
                finalize(
                    () =>
                        void (async () => {
                            await delay(1000);
                            this.loading = false;
                        })()
                )
            )
            .subscribe((response: DadosInscricaoInterface) => {
                this.atividades = response.atividade;
                this.documentos = response.documento_orgao;
                this.anexos = response.anexo;
                this.carregarDadosFormulario(response);
            });
    }

    public carregarDadosFormulario(dadosInscricao: DadosInscricaoInterface): void {
        this.produtorForm.setValues(dadosInscricao);
    }

    public preencherNomeByCpf(): void {
        const cpf = clearMask(this.produtorForm.no_cpf.value);

        if (cpf) {
            if (cpf.length === 11 && this.produtorForm.no_cpf.valid) {
                this.jarvisService
                    .getPessoaCpf(cpf)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        })
                    )
                    .subscribe((response: HttpResponse<GatewayReceitaInterface>) => {
                        this.produtorForm.ds_nome.setValue(response.body.nome);
                    });
            }
        }
    }

    public validateAllFormFields(): boolean {
        if (this.produtorForm.invalid) {
            this.loadingUpdate = false;
            this.alertService.openModal({
                title: 'Atenção',
                message: MensagensEnum.CAMPOS_OBRIGATORIOS,
                style: 'warning'
            });
            return false;
        }

        return true;
    }

    public salvar(): void {
        this.produtorForm.markAllAsTouched();

        if (this.validateAllFormFields()) {
            this.loadingUpdate = true;
            this.solicitacaoService
                .putDadosInscricao(this._solicitacaoId, this.parseDados())
                .pipe(
                    finalize(() => {
                        this.loadingUpdate = false;
                    })
                )
                .subscribe((response: DadosInscricaoInterface) => {
                    navigate(this.router, RotasEnum.VISUALIZARPROCESSO_VISUALIZAR, response.nu_seq_usuario);
                });
        }
    }

    public parseDados(): DadosInscricaoInterface {
        const produtorData = this.produtorForm.getDados();

        const solicitacaoData: DadosInscricaoInterface = {
            ...produtorData
        };

        return solicitacaoData;
    }

    public isFieldValid(form: FormGroup, field: string): boolean {
        return !form.get(field).valid && form.get(field).dirty;
    }

    public voltar(): void {
        navigate(this.router, RotasEnum.VISUALIZARPROCESSO, this._solicitacaoId);
    }

    private setOptions(): void {
        this.sexosOptions.next([
            {
                key: 'M',
                value: 'Masculino'
            },
            {
                key: 'F',
                value: 'Feminino'
            }
        ]);
        this.tiposPessoaOptions.next([
            {
                key: true,
                value: 'PESSOA FÍSICA'
            },
            {
                key: false,
                value: 'PESSOA JURÍDICA'
            }
        ]);
    }
}
