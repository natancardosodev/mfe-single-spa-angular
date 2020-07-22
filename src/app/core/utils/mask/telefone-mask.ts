import { Mask } from './mask';

export class TelefoneMask extends Mask {
    public constructor() {
        super([/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]);
    }
}
