/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export class ObservacaoForm extends FormGroup {
    constructor() {
        super({
            descricao: new FormControl(null)
        });
    }

    public get descricao(): AbstractControl {
        return this.get('descricao');
    }

    public getDadosForm(): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.value;
    }

    // Passar interface
    public setValues(data: any): void {
        this.descricao.setValue(data.descricao);
    }

    public getDadosEnvioObservacao(): any {
        return {
            descricao: this.value.descricao
        };
    }
}
