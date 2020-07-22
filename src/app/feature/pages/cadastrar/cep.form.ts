/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

export class CepForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        valorInvalido: 'O valor informado no campo %s é inválido',
        quantidadeInvalida: 'O CPF deve possuir 11 caracteres.'
    };

    constructor() {
        super({
            logradouro: new FormControl(null, [Validators.required])
        });
    }

    public get logradouro(): AbstractControl {
        return this.get('logradouro');
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public getDadosForm(): any {
        this.deleteControlValuesNull();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.value;
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsTouched());
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }

    public setValues(data): void {
        Object.keys(data).map((key: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (typeof data[key] === 'object') {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-member-access
                this.get(key) ? this.get(key).setValue(data[key] ? data[key].value : null) : null;

                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-member-access
            this.get(key) ? this.get(key).setValue(data[key]) : null;
        });

        this.logradouro.setValue(data.logradouro);
    }
}
