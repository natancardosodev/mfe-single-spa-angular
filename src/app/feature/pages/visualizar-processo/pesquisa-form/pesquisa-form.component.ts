import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GeneralsUtil } from './../../../../core/utils/generals.util';
import { AlertMessage } from './../../../../core/utils/alert-message';
import { TextMaskFactory } from './../../../../core/utils/mask/text-mask-factory';
import { PesquisaForm } from './pesquisa.form';

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
    private $maskFactory: TextMaskFactory;

    constructor(private $alertMessage: AlertMessage) {
        this.dataForm = new EventEmitter();
        this.$maskFactory = new TextMaskFactory();
        this._pesquisaForm = new PesquisaForm();
        this.dateMax = new Date();
        this.loading = false;
    }

    public ngOnInit(): void {
        this.setDateMin();
    }

    public get pesquisaForm(): PesquisaForm {
        return this._pesquisaForm;
    }

    public get maskFactory(): TextMaskFactory {
        return this.$maskFactory;
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

        this.$alertMessage.alert('Informe pelo menos um campo para pesquisa');
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
