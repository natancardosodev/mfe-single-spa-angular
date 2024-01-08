import { UntypedFormGroup, UntypedFormControl, AbstractControl, Validators } from '@angular/forms';

export class IndeferirForm extends UntypedFormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.'
    };
    constructor() {
        super({
            descricao: new UntypedFormControl(null, [Validators.required])
        });
    }

    public get descricao(): AbstractControl {
        return this.get('descricao');
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    // Retornar Interface
    public getDadosForm(): any {
        this.deleteControlValuesNull();
        return this.value;
    }

    // Passar Interface
    public setValues(data: any): void {
        this.descricao.setValue(data.descricao);
    }

    // Retornar Interface
    public getDadosEnvioIndeferir(): any {
        return {
            descricao: this.value.descricao
        };
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }
}
