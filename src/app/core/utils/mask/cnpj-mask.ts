import { Mask } from './mask';

export class CnpjMask extends Mask {
    public constructor() {
        super([/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]);
    }
}
