import { UntypedFormGroup, UntypedFormControl, AbstractControl } from '@angular/forms';

export class ObservacaoForm extends UntypedFormGroup {
    constructor() {
        super({
            descricao: new UntypedFormControl(null)
        });
    }

    public get descricao(): AbstractControl {
        return this.get('descricao');
    }

    public getDadosForm(): any {
        return this.value;
    }

    // Passar interface
    public setValues(data: any): void {
        this.descricao.setValue(data.descricao);
    }

    public getDados(): any {
        return {
            descricao: this.value.descricao
        };
    }
}
