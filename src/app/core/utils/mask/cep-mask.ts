import { Mask } from './mask';

export class CepMask extends Mask {
    public constructor() {
        super([/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]);
        super.tornarGuideOff();
    }
}
