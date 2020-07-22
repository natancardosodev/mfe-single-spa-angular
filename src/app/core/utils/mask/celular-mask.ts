import { Mask } from './mask';

export class CelularMask extends Mask {
    public constructor() {
        super([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    }
}
