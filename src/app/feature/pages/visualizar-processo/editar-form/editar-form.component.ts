import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { isValidCpf } from '@brazilian-utils/is-valid-cpf';
import { isValidCnpj } from '@brazilian-utils/is-valid-cnpj';

import { MensagensEnum } from 'src/app/core/enums/mensagens.enum';
import { Dados } from 'src/app/core/interfaces/pessoa-fisica/dados';
import {
    AnexoInterface,
    AtividadeInterface,
    DadosInscricaoInterface,
    DocumentoOrgaoInterface
} from 'src/app/core/interfaces/pessoa-fisica/dados-inscricao.interface';
import { CommonService } from 'src/app/core/services/common.service';
import { GeneralsUtil } from 'src/app/core/utils/generals.util';
import { TextMaskFactory } from 'src/app/core/utils/mask/text-mask-factory';
import { SolicitacaoService } from 'src/app/feature/services/solicitacao.service';
import { ContabilistaForm } from './form/contabilista.form';
import { ImovelForm } from './form/imovel.form';
import { ProdutorForm } from './form/produtor.form';
import { RotasEnum } from 'src/app/core/enums/rotas.enum';
import { JarvisService } from 'src/app/feature/services/jarvis.service';
import { clearMask } from 'src/app/core/configs/regexClearMask';
import { GatewayReceitaInterface } from 'src/app/core/interfaces/jarvis/gateway-receita.interface';
import { AlertService } from 'lib-ui-interno';

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
    public nuSeqUsuario: number;
    public listaMunicipiosImovel: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public listaMunicipiosProdutor: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public listaMunicipiosContabilista: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public tiposPessoa: BehaviorSubject<Array<Dados>> = new BehaviorSubject([]);
    public listaUf$: Observable<Array<Dados>>;
    public invalidDateFormate: string;
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
        private solicitacaoService: SolicitacaoService,
        private activeRouter: ActivatedRoute,
        private location: Location,
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
        this.invalidDateFormate = MensagensEnum.DATE_INVALID_FORMAT;
    }

    public ngOnInit(): void {
        window.scrollTo(0, 0);
        this._solicitacaoId = this.activeRouter.snapshot.params.id;
        this.getDadosSolicitacao();
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
                            await GeneralsUtil.delay(1000);
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
            this.tipoPessoaJuridica = false;
            return;
        }
        this.tipoPessoaJuridica = true;
        return;
    }

    public preencherNomeByCpf(): void {
        const cpf = clearMask(this.contabilistaForm.co_cpf.value);

        if (cpf) {
            if (isValidCpf(cpf) && cpf.length === 11 && this.contabilistaForm.co_cpf.valid) {
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
            } else {
                this.alertService.openModal({
                    title: 'Atenção',
                    message: MensagensEnum.INVALID_CPF,
                    style: 'warning'
                });
            }
        }
    }

    public preencherNomeByCnpj(): void {
        const cnpj = clearMask(this.contabilistaForm.co_cnpj.value);
        if (cnpj) {
            if (isValidCnpj(cnpj) && cnpj.length === 14 && this.contabilistaForm.co_cnpj.valid) {
                this.jarvisService
                    .getPessoaCnpj(cnpj)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        })
                    )
                    .subscribe(
                        (response: HttpResponse<GatewayReceitaInterface>) => {
                            this.contabilistaForm.ds_nome_empresa.setValue(response.body.nome);
                        },
                        (error) => {
                            window.console.error(error);
                        }
                    );
            } else {
                this.alertService.openModal({
                    title: 'Atenção',
                    message: MensagensEnum.INVALID_CNPJ,
                    style: 'warning'
                });
            }
        }
    }

    public salvar(): void {
        this.produtorForm.markAllAsTouched();
        this.imovelForm.markAllAsTouched();
        this.contabilistaForm.markAllAsTouched();

        if (this.validateAllFormFields()) {
            this.loadingUpdate = true;
            this.solicitacaoService
                .putDadosInscricao(this._solicitacaoId, this.parseSolicitacaoData())
                .pipe(
                    finalize(() => {
                        this.loadingUpdate = false;
                    })
                )
                .subscribe(
                    (response: DadosInscricaoInterface) => {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        this.router.navigate([RotasEnum.EMPRESA_VISUALIZAR, response.nu_seq_usuario]);
                    },
                    (error) => {
                        window.console.error(error);
                    }
                );
            return;
        }
    }

    public validateAllFormFields(): boolean {
        if (this.produtorForm.invalid || this.imovelForm.invalid || this.contabilistaForm.invalid) {
            this.loadingUpdate = false;
            this.alertService.openModal({
                title: 'Atenção',
                message: MensagensEnum.VALIDA_CAMPOS_OBRIGATORIOS,
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
                        nu_latitude: null,
                        nu_longitude: null
                    }
                },
                endereco_correspondencia: {
                    co_cep: imovelData.co_cep,
                    co_tipo_logradouro: imovelData.co_tipo_logradouro,
                    ds_endereco: imovelData.ds_endereco,
                    nu_numero: imovelData.nu_numero,
                    ds_bairro: imovelData.ds_bairro,
                    co_municipio: imovelData.co_municipio,
                    co_uf: imovelData.co_uf,
                    ds_ponto_referencia: imovelData.ds_ponto_referencia
                }
            },
            contabilista: {
                co_cpf_cnpj: contabilistaData.co_cpf_cnpj,
                ds_nome: contabilistaData.ds_nome,
                responsavel: {
                    ds_nome: contabilistaData.ds_nome,
                    conselho: {
                        co_uf_crc: contabilistaData.co_uf_crc,
                        nu_sequencia: contabilistaData.nu_sequencia,
                        dt_registro: contabilistaData.dt_registro,
                        co_tipo_classificacao_crc: contabilistaData.co_tipo_classificacao_crc,
                        nu_tipo_crc: contabilistaData.nu_tipo_crc,
                        co_digito_verificador: contabilistaData.co_digito_verificador
                    }
                },
                conselho: {
                    co_uf_crc: contabilistaData.co_uf_crc,
                    nu_sequencia: contabilistaData.nu_sequencia,
                    dt_registro: contabilistaData.dt_registro,
                    co_tipo_classificacao_crc: contabilistaData.co_tipo_classificacao_crc,
                    nu_tipo_crc: contabilistaData.nu_tipo_crc,
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
        void this.router.navigate([RotasEnum.EMPRESA, this._solicitacaoId]);
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
