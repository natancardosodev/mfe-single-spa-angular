import { Mask } from './mask';

export class CpfMask extends Mask {
    public constructor() {
        super([/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]);
    }
}
