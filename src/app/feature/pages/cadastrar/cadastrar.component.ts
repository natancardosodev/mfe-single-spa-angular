import { Component, EventEmitter, OnInit, ElementRef, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { EnderecoService } from '../../services/endereco.service';
import { CommonService } from 'src/app/core/services/common.service';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { StorageUtil } from 'src/app/core/utils/storage.util';
import { UsuarioLogadoInterface } from 'src/app/core/interfaces/usuario-logado.interface';
import { LeiloeiroInterface } from 'src/app/core/interfaces/leiloeiro.interface';
import { EnderecoPorCepInterface } from 'src/app/core/interfaces/enderecoPorCep.interface';
import { TextMaskFactory } from 'src/app/core/utils/mask/text-mask-factory';
import { clearMask } from 'src/app/core/configs/regexClearMask';

import { CepForm } from './cep.form';
import { PessoaForm } from './pessoa.form';
import { EnderecoForm } from './endereco.form';
import { datepickerConfig } from 'src/app/core/configs/datepickerConfig';
import { AlertCheckProcessoComponent } from 'src/app/core/components/alert-check-processo/alert-check-processo.component';

@Component({
    selector: 'app-cadastrar',
    templateUrl: './cadastrar.component.html',
    styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
    @Output() public dataForm: EventEmitter<any>;
    @ViewChild(AlertCheckProcessoComponent, { static: false }) checkProcesso: AlertCheckProcessoComponent;
    public naturalidade$: Observable<any>;
    public municipioEndereco$: Observable<any>;
    public modalRef: BsModalRef;
    public showOptionsCep: boolean;
    public enderecosBuscados: Record<string, string>[];
    public datepickerConfig: any;
    public loading: boolean;
    private _usuarioLogado: UsuarioLogadoInterface;
    private _cepForm: CepForm;
    private _pessoaForm: PessoaForm;
    private _enderecoForm: EnderecoForm;
    private _maskFactory: TextMaskFactory;

    constructor(
        private enderecoService: EnderecoService,
        private modalService: BsModalService,
        private router: Router,
        private _commonService: CommonService,
        private _solicitacaoService: SolicitacaoService
    ) {
        this.loading = false;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this._usuarioLogado = StorageUtil.get('user');
        this.dataForm = new EventEmitter();
        this._cepForm = new CepForm();
        this.showOptionsCep = false;
        this._pessoaForm = new PessoaForm();
        this._enderecoForm = new EnderecoForm();
        this.datepickerConfig = datepickerConfig;
        this._maskFactory = new TextMaskFactory();
    }

    ngOnInit(): void {
        this.pessoaForm.cpf.setValue(this._usuarioLogado.cpf);
        this.pessoaForm.nome.setValue(this._usuarioLogado.nome);
        this.changeUf();
        this.changeIsBrasileiro();
    }

    ngAfterViewInit(): void {
        this.checkProcesso.hasSolicitacao();
    }

    public get commonService(): CommonService {
        return this._commonService;
    }

    public get solicitacaoService(): SolicitacaoService {
        return this._solicitacaoService;
    }

    public get pessoaForm(): PessoaForm {
        return this._pessoaForm;
    }

    public get enderecoForm(): EnderecoForm {
        return this._enderecoForm;
    }

    public get cepForm(): CepForm {
        return this._cepForm;
    }

    public salvar(): void {
        this.enderecoForm.markAllAsTouched();
        this.pessoaForm.markAllAsTouched();

        if (this.pessoaForm.valid && this.enderecoForm.valid) {
            this.loading = true;
            this.solicitacaoService
                .postSolicitacao(this.parseDadosEnvio())
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe(
                    (success: LeiloeiroInterface) => {
                        const processo = this.solicitacaoService.getProcesso({
                            protocolo: success.protocolo,
                            cpf: success.pessoa.cpf
                        });
                        StorageUtil.store('processo', processo);
                        void this.router.navigateByUrl('acompanhar');
                    },
                    (error) => {
                        window.console.error(error);
                    }
                );
        }
    }

    public pesquisar(): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const formValue = this.pessoaForm.getDadosForm();

        if (this._pessoaForm.valid && !this.isEmpty(formValue)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const parametros = Object.assign(formValue);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.dataForm.emit({ form: parametros });

            return;
        }

        if (this.isEmpty(formValue)) {
            // this.alert('Informe pelo menos um campo para pesquisa');
            // console.log('Informe pelo menos um campo para pesquisa');
        }
    }

    public parseDadosEnvio(): LeiloeiroInterface {
        return {
            uf: window.location.host.split('.')[2].toUpperCase(),
            endereco: this.enderecoForm.getDadosEnvioEndereco(),
            pessoa: this.pessoaForm.getDadosEnvioPessoa()
        };
    }

    public isEmpty(dado: Record<string, string>): boolean {
        return !Object.keys(dado).length;
    }

    public openModal(template: ElementRef<any>, config?: Record<string, boolean>): void {
        this.modalRef = this.modalService.show(template, config);
    }

    public closeModal(): void {
        this.modalRef.hide();
    }

    public isFieldValid(form: FormGroup, field: string): boolean {
        return !form.get(field).valid && form.get(field).dirty;
    }

    public get maskFactory(): TextMaskFactory {
        return this._maskFactory;
    }

    public changeUf(): void {
        this.pessoaForm.ufNaturalidade.valueChanges.subscribe((value: string) => {
            this.naturalidade$ = this.enderecoService.getMunicipio({ uf: value });
        });

        this.enderecoForm.uf.valueChanges.subscribe((value: string) => {
            this.municipioEndereco$ = this.enderecoService.getMunicipio({ uf: value });
        });
    }

    public changeIsBrasileiro(): void {
        this.pessoaForm.isBrasileiro.valueChanges.subscribe((value) => {
            if (!value && this.pessoaForm.nacionalidade.value) {
                this.pessoaForm.naturalidadeEstrangeira.setValue(
                    this.commonService.getValueByKey('nacionalidadeOptions._value', this.pessoaForm.nacionalidade.value)
                );
                this.pessoaForm.ufNaturalidade.disable();
                this.pessoaForm.naturalidade.disable();
            }
            if (value) {
                this.pessoaForm.naturalidadeEstrangeira.setValue(null);
                this.pessoaForm.ufNaturalidade.enable();
                this.pessoaForm.naturalidade.enable();
            }
        });
    }

    public getLogradouroPeloCep(): void {
        if (this.cepForm.valid && !this.isEmpty(this.cepForm.value)) {
            this.enderecoService
                .getCepPeloLogradouro(this.cepForm.value)
                .pipe(finalize(() => {}))
                .subscribe(
                    (response: Array<Record<string, string>>) => {
                        this.showOptionsCep = true;
                        this.enderecosBuscados = response;
                    },
                    (erro: Response) => window.console.log(erro)
                );
        }

        if (this.isEmpty(this.cepForm.value)) {
            // this.alert('Informe pelo menos um campo para pesquisa');
            // console.log('Informe pelo menos um campo para pesquisa');
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public definirEnderecoPorCep(cep: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (cep.target) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            cep = clearMask(cep.target.value);
        }

        this.enderecoService
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            .getCep(cep)
            .pipe(finalize(() => {}))
            .subscribe(
                (response: EnderecoPorCepInterface) => {
                    this.enderecoForm.cep.setValue(response.cep.toString());
                    this.enderecoForm.tipoLogradouro.setValue(response.tipo_logradouro.id);
                    this.enderecoForm.logradouro.setValue(response.logradouro);
                    this.enderecoForm.bairro.setValue(response.bairro);
                    this.enderecoForm.uf.setValue(response.municipio.estado.id);
                    this.enderecoForm.municipio.setValue(response.municipio.id);
                },
                (erro: Response) => window.console.log(erro)
            );
    }
}
