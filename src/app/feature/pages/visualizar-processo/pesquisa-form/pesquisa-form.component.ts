import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'lib-vox-ui';

import { ParametrosPesquisaInterface } from '@core/interfaces/visualizar-processo/pesquisa.interface';
import { isEmpty } from '@core/utils/generals.util';
import { FormFieldGridPesquisa, FormLabelGridPesquisa } from '@core/enums/visualizar-processo/form-grid-pesquisa.enum';
import { PesquisaForm } from './pesquisa.form';

@Component({
    selector: 'app-pesquisa-form',
    templateUrl: './pesquisa-form.component.html',
    styleUrls: ['./pesquisa-form.component.scss']
})
export class PesquisaFormComponent implements OnInit {
    @Input() public loading: boolean;
    @Output() public dataForm: EventEmitter<any>;
    public formFieldGridPesquisa = FormFieldGridPesquisa;
    public formLabelGridPesquisa = FormLabelGridPesquisa;
    public tipos: BehaviorSubject<any> = new BehaviorSubject([]);
    public statusProcesso: BehaviorSubject<any> = new BehaviorSubject([]);
    public loadingPage: boolean;
    public dateMin: Date;
    public dateMax: Date;
    private _pesquisa: ParametrosPesquisaInterface;
    private _pesquisaForm: PesquisaForm;

    constructor(private titleService: Title, private alertService: AlertService) {
        this.dataForm = new EventEmitter();
        this._pesquisaForm = new PesquisaForm();
        this.dateMax = new Date();
        this.loading = false;
        this.loadingPage = true;
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
        this.setDateMin();
        this.setOptions();
    }

    public get pesquisaForm(): PesquisaForm {
        return this._pesquisaForm;
    }

    public setOptions(): void {
        this.tipos.next([
            {
                key: 'Leiloeiro',
                value: 'Leiloeiro'
            },
            {
                key: 'Tradutor',
                value: 'Tradutor'
            }
        ]);
        this.statusProcesso.next([
            {
                key: 29,
                value: 'Aguardando análise'
            },
            {
                key: 36,
                value: 'Aguardando habilitação'
            },
            {
                key: 37,
                value: 'Aguardando nomeação'
            },
            {
                key: 2,
                value: 'Em exigência'
            },
            {
                key: 8,
                value: 'Indeferido'
            }
        ]);
        this.loadingPage = false;
    }

    public pesquisar(): void {
        const formValue = this.pesquisaForm.getDadosForm();

        if (!isEmpty(formValue)) {
            if (this._pesquisaForm.valid) {
                const parametros = this.pesquisaForm.getValuesFormated();
                this.dataForm.emit({ form: parametros });
                return;
            }
            return;
        }

        this.alertService.openModal({
            title: 'Atenção',
            message: 'Informe pelo menos um campo para pesquisa',
            style: 'warning'
        });
    }

    public isFieldValid(form: FormGroup, field: string): any {
        return !form.get(field).valid && form.get(field).dirty;
    }

    private setDateMin(): void {
        this.pesquisaForm.dataInicial.valueChanges.subscribe((date: Date) => {
            this.dateMin = date;
        });
    }
}
