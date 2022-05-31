import { Pipe, PipeTransform } from '@angular/core';
import { formatDateEnToBr } from '@core/utils/date.util';

@Pipe({
    name: 'mask'
})
export class MaskPipe implements PipeTransform {
    acceptedsMasks: any;

    constructor() {
        this.initMethods();
    }

    /**
     * @memberof MaskPipe
     */
    public initMethods(): void {
        this.acceptedsMasks = {
            cpf: (value: string): string => {
                return value ? value.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4') : '';
            },
            cnpj: (value: string): string => {
                return value ? value.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5') : '';
            },
            cep: (value: string): string => {
                return value ? value.toString().replace(/(\d{5})(\d{3})/g, '$1-$2') : '';
            },
            data: (value: string): string => {
                return value ? formatDateEnToBr(value) : '';
            },
            telefone: (value: string): string => {
                if (value) {
                    if (value.length === 10) {
                        return value.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
                    }

                    return value.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
                }
            }
        };
    }

    /**
     * @param {*} value
     * @param {*} format
     * @returns {*}
     * @memberof MaskPipe
     */
    transform(value: string, format: any): string {
        const maskFn = this.acceptedsMasks[format];
        if (format && maskFn) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            return maskFn(value);
        }

        return value;
    }
}
