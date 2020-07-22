import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

export class OficioForm extends FormGroup {
    private $errorMessages = {
        required: 'O campo %s é obrigatório.'
    };

    constructor() {
        super({
            oficio: new FormControl('', Validators.required)
        });
    }

    public get oficio(): AbstractControl {
        return this.get('oficio');
    }

    public getDadosForm(): any {
        this.deleteControlValuesNull();
        return this.value;
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        return this.$errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
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
}
