import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { GeneralsUtil } from './../../../../core/utils/generals.util';
import { TextMaskFactory } from './../../../../core/utils/mask/text-mask-factory';
import { PesquisaForm } from './pesquisa.form';
import { AlertService } from 'src/app/core/components/alert/alert.service';

@Component({
    selector: 'app-pesquisa-form',
    templateUrl: './pesquisa-form.component.html',
    styleUrls: ['./pesquisa-form.component.scss']
})
export class PesquisaFormComponent implements OnInit {
    @Input() public loading: boolean;
    @Output() public dataForm: EventEmitter<any>;
    public dateMin: Date;
    public dateMax: Date;
    private _pesquisaForm: PesquisaForm;
    private _maskFactory: TextMaskFactory;

    constructor(private titleService: Title, private alertService: AlertService) {
        this.dataForm = new EventEmitter();
        this._maskFactory = new TextMaskFactory();
        this._pesquisaForm = new PesquisaForm();
        this.dateMax = new Date();
        this.loading = false;
    }

    public ngOnInit(): void {
        this.titleService.setTitle('Visualizar Processo - Skeleton');
        this.setDateMin();
    }

    public get pesquisaForm(): PesquisaForm {
        return this._pesquisaForm;
    }

    public get maskFactory(): TextMaskFactory {
        return this._maskFactory;
    }

    public pesquisar(): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const formValue = this.pesquisaForm.getDadosForm();

        if (!GeneralsUtil.isEmpty(formValue)) {
            if (this._pesquisaForm.valid) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const parametros = this.pesquisaForm.getValuesFormated();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.dataForm.emit({ form: parametros });
                return;
            }
            return;
        }

        this.alertService.openModal('Atenção', 'Informe pelo menos um campo para pesquisa', 'warning');
    }

    public setDateMin(): void {
        this.pesquisaForm.dataInicial.valueChanges.subscribe((date: Date) => {
            this.dateMin = date;
        });
    }

    public isFieldValid(form: FormGroup, field: string): any {
        return !form.get(field).valid && form.get(field).dirty;
    }
}
