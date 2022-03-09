import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'lib-ui-interno';

import {
    AnexoInterface,
    AtividadeInterface,
    DadosInscricaoInterface,
    DocumentoOrgaoInterface
} from '@core/interfaces/pessoa-fisica/dados-inscricao.interface';
import { Dados } from '@core/interfaces/pessoa-fisica/dados';
import { CommonService } from '@core/services/common.service';
import { TextMaskFactory } from '@core/utils/mask/text-mask-factory';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { RotasEnum } from '@core/enums/rotas.enum';
import { JarvisService } from '@feature/services/jarvis.service';
import { clearMask } from '@core/configs/regexClearMask';
import { GatewayReceitaInterface } from '@core/interfaces/jarvis/gateway-receita.interface';
import { MensagensEnum } from '@core/enums/mensagens.enum';
import { ContabilistaForm } from './form/contabilista.form';
import { ImovelForm } from './form/imovel.form';
import { ProdutorForm } from './form/produtor.form';
import { delay, navigate } from '@core/utils/generals.util';

@Component({
    selector: 'app-editar-form',
    templateUrl: './editar-form.component.html',
    styleUrls: ['./editar-form.component.scss']
})
export class EditarFormComponent implements OnInit {
    public isCollapsed: boolean;
    public loading: boolean;
    public loadingUpdate: boolean;
    public loadingUf: boolean;
    public tipoPessoaFisica: boolean;
    public tipoPessoaJuridica: boolean;
    public readonly: boolean;
    public atividades: Array<AtividadeInterface>;
    public documentos: Array<DocumentoOrgaoInterface>;
    public anexos: Array<AnexoInterface>;
    public listaMunicipiosImovel: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public listaMunicipiosProdutor: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public listaMunicipiosContabilista: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public tiposPessoa: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public listaUf$: Observable<Array<Dados>>;
    public sexos: BehaviorSubject<any> = new BehaviorSubject([]);
    private _produtorForm: ProdutorForm;
    private _imovelForm: ImovelForm;
    private _contabilistaForm: ContabilistaForm;
    private _solicitacaoId: number;
    private _maskFactory: TextMaskFactory;

    public get produtorForm(): ProdutorForm {
        return this._produtorForm;
    }

    public get imovelForm(): ImovelForm {
        return this._imovelForm;
    }

    public get contabilistaForm(): ContabilistaForm {
        return this._contabilistaForm;
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
        this.isCollapsed = false;
        this.readonly = true;
        this._maskFactory = new TextMaskFactory();
        this._produtorForm = new ProdutorForm();
        this._imovelForm = new ImovelForm();
        this._contabilistaForm = new ContabilistaForm();
        this.activatedRoute.params.subscribe((params) => {
            this._solicitacaoId = params['id'] ? params['id'] : null;
        });
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
        this.getDadosSolicitacao();
        this.disabledFields();
        this.preencherNomeByCpf();
        this.setOptions();
    }

    public ngAfterViewInit(): void {
        this.contabilistaForm.tipo_pessoa.valueChanges.subscribe((value: boolean) => {
            this.verificaTipoPessoa(value);
        });
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
        this.imovelForm.setValues(dadosInscricao.imovel);
        this.contabilistaForm.setValues(dadosInscricao.contabilista);
    }

    public verificaTipoPessoa(event: boolean): void {
        if (event === true) {
            this.disabledFields();
            this.tipoPessoaJuridica = false;
            return;
        }
        this.enableFields();
        this.tipoPessoaJuridica = true;
        return;
    }

    public preencherNomeByCnpj(): void {}

    public carregarMunicipio(uf: number, tipo: string): void {
        this.loadingUf = true;
        this.jarvisService
            .getOptionsMunicipioByCoUf(uf)
            .pipe(
                finalize(
                    () =>
                        void (async () => {
                            await delay(1000);
                            this.loadingUf = false;
                        })()
                )
            )
            .subscribe((response) => {
                this.loadingUf = false;

                switch (tipo) {
                    case 'Produtor':
                        if (response) {
                            this.listaMunicipiosProdutor.next(response.body);
                            return;
                        }
                        this.produtorForm.uf_pais.reset();
                        break;

                    case 'Imovel':
                        if (response) {
                            this.listaMunicipiosImovel.next(response.body);
                            return;
                        }
                        this.imovelForm.uf_imovel.reset();
                        break;

                    case 'Contabilista':
                        if (response) {
                            this.listaMunicipiosContabilista.next(response.body);
                            return;
                        }
                        this.contabilistaForm.co_uf.reset();
                        break;

                    default:
                        break;
                }
                return;
            });
    }

    public disabledFields(): void {
        this.contabilistaForm.co_cnpj.disable();
        this.contabilistaForm.ds_nome_empresa.disable();
        this.contabilistaForm.ds_classificacao_empresa.disable();
        this.contabilistaForm.nu_tipo_crc_empresa.disable();
        this.contabilistaForm.co_tipo_classificacao_crc_empresa.disable();
        this.contabilistaForm.co_digito_verificador_empresa.disable();
        this.contabilistaForm.co_uf_crc_empresa.disable();
        this.contabilistaForm.co_cnpj.updateValueAndValidity();
        this.contabilistaForm.ds_nome_empresa.updateValueAndValidity();
        this.contabilistaForm.ds_classificacao_empresa.updateValueAndValidity();
        this.contabilistaForm.nu_tipo_crc_empresa.updateValueAndValidity();
        this.contabilistaForm.co_tipo_classificacao_crc_empresa.updateValueAndValidity();
        this.contabilistaForm.co_digito_verificador_empresa.updateValueAndValidity();
        this.contabilistaForm.co_uf_crc_empresa.updateValueAndValidity();
    }

    public enableFields(): void {
        this.contabilistaForm.co_cnpj.enable();
        this.contabilistaForm.ds_nome_empresa.enable();
        this.contabilistaForm.ds_classificacao_empresa.enable();
        this.contabilistaForm.nu_tipo_crc_empresa.enable();
        this.contabilistaForm.co_tipo_classificacao_crc_empresa.enable();
        this.contabilistaForm.co_digito_verificador_empresa.enable();
        this.contabilistaForm.co_uf_crc_empresa.enable();
        this.contabilistaForm.co_cnpj.setValidators(Validators.required);
        this.contabilistaForm.ds_nome_empresa.setValidators(Validators.required);
        this.contabilistaForm.ds_classificacao_empresa.setValidators(Validators.required);
        this.contabilistaForm.nu_tipo_crc_empresa.setValidators(Validators.required);
        this.contabilistaForm.co_tipo_classificacao_crc_empresa.setValidators(Validators.required);
        this.contabilistaForm.co_digito_verificador_empresa.setValidators(Validators.required);
        this.contabilistaForm.co_uf_crc_empresa.setValidators(Validators.required);
    }

    public preencherNomeByCpf(): void {
        const cpf = clearMask(this.contabilistaForm.co_cpf.value);

        if (cpf) {
            if (cpf.length === 11 && this.contabilistaForm.co_cpf.valid) {
                this.jarvisService
                    .getPessoaCpf(cpf)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        })
                    )
                    .subscribe(
                        (response: HttpResponse<GatewayReceitaInterface>) => {
                            this.contabilistaForm.ds_nome.setValue(response.body.nome);
                        },
                        (error) => {
                            window.console.error(error);
                        }
                    );
            }
        }
    }

    public salvar(): void {
        this.produtorForm.markAllAsTouched();
        this.imovelForm.markAllAsTouched();

        if (this.validateAllFormFields()) {
            this.loadingUpdate = true;
            this.solicitacaoService
                .putDadosInscricao(this._solicitacaoId, this.parseSolicitacaoData())
                .pipe(
                    finalize(() => {
                        this.loadingUpdate = false;
                    })
                )
                .subscribe((response: DadosInscricaoInterface) => {
                    navigate(this.router, RotasEnum.EMPRESA_VISUALIZAR, response.nu_seq_usuario);
                });
        }
    }

    public validateAllFormFields(): boolean {
        if (this.produtorForm.invalid || this.imovelForm.invalid) {
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

    public parseSolicitacaoData(): DadosInscricaoInterface {
        const produtorData = this.produtorForm.value;
        const imovelData = this.imovelForm.value;
        const contabilistaData = this.contabilistaForm.value;
        const atividadeData = [];

        const solicitacaoData: DadosInscricaoInterface = {
            nu_seq_solicitacao: produtorData.nu_seq_solicitacao,
            ds_nome: produtorData.ds_nome,
            co_sexo: produtorData.co_sexo,
            co_tipo_documento: produtorData.co_tipo_documento,
            nu_documento: produtorData.nu_documento,
            ds_orgao_emissor: produtorData.ds_orgao_emissor,
            co_uf_emissor: produtorData.co_uf_emissor,
            ds_escolaridade: produtorData.ds_escolaridade,
            data_nascimento: produtorData.data_nascimento,
            atividade: atividadeData,
            imovel: {
                nu_inscricao_rural: imovelData.nu_inscricao_rural,
                nu_car: imovelData.nu_car,
                nu_ccir: imovelData.nu_ccir,
                nu_sigef: imovelData.nu_sigef,
                endereco: {
                    co_cep: imovelData.co_cep,
                    co_tipo_logradouro: imovelData.co_tipo_logradouro,
                    ds_endereco: imovelData.ds_endereco,
                    nu_numero: imovelData.nu_numero,
                    ds_bairro: imovelData.ds_bairro,
                    co_tipo_imovel: imovelData.co_tipo_imovel,
                    co_municipio: imovelData.co_municipio,
                    co_uf: imovelData.co_uf,
                    ds_ponto_referencia: imovelData.ds_ponto_referencia,
                    nu_area_total: imovelData.nu_area_total,
                    nu_area_producao: imovelData.nu_area_producao,
                    coordenadas_geograficas: {
                        latitude: imovelData.latitude,
                        longitude: imovelData.longitude
                    }
                },
                endereco_correspondencia: {
                    co_cep: produtorData.co_cep,
                    co_tipo_logradouro: produtorData.co_tipo_logradouro,
                    ds_endereco: produtorData.ds_endereco,
                    nu_numero: produtorData.nu_numero,
                    ds_bairro: produtorData.ds_bairro,
                    co_municipio: produtorData.co_municipio,
                    co_uf: produtorData.co_uf,
                    ds_ponto_referencia: produtorData.ds_ponto_referencia,
                    co_telefone: produtorData.co_telefone,
                    ds_email: produtorData.ds_email
                }
            },
            contabilista: {
                co_cpf_cnpj: contabilistaData.co_cpf_cnpj,
                ds_nome: contabilistaData.ds_nome,
                responsavel: {
                    ds_nome: contabilistaData.ds_nome,
                    conselho: {
                        co_uf_crc: contabilistaData.co_uf_crc,
                        nu_sequencia: this._solicitacaoId,
                        dt_registro: contabilistaData.dt_registro,
                        co_tipo_classificacao_crc: contabilistaData.co_tipo_classificacao_crc,
                        nu_tipo_crc: contabilistaData.nu_tipo_crc_empresa,
                        co_digito_verificador: contabilistaData.co_digito_verificador
                    }
                },
                conselho: {
                    co_uf_crc: contabilistaData.co_uf_crc,
                    nu_sequencia: this._solicitacaoId,
                    dt_registro: contabilistaData.dt_registro,
                    co_tipo_classificacao_crc: contabilistaData.co_tipo_classificacao_crc,
                    nu_tipo_crc: contabilistaData.co_tipo_classificacao_crc,
                    co_digito_verificador: contabilistaData.co_digito_verificador
                },
                endereco: {
                    co_cep: contabilistaData.co_cep,
                    co_tipo_logradouro: contabilistaData.co_tipo_logradouro,
                    ds_endereco: contabilistaData.ds_endereco,
                    nu_numero: contabilistaData.nu_numero,
                    ds_complemento: contabilistaData.ds_complemento,
                    ds_bairro: contabilistaData.ds_bairro,
                    co_municipio: contabilistaData.co_municipio,
                    co_uf: contabilistaData.co_uf
                }
            }
        };

        return solicitacaoData;
    }

    public isFieldValid(form: FormGroup, field: string): boolean {
        return !form.get(field).valid && form.get(field).dirty;
    }

    public voltar(): void {
        navigate(this.router, RotasEnum.EMPRESA, this._solicitacaoId);
    }

    private setOptions(): void {
        this.sexos.next([
            {
                key: 'M',
                value: 'Masculino'
            },
            {
                key: 'F',
                value: 'Feminino'
            }
        ]);
        this.tiposPessoa.next([
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
