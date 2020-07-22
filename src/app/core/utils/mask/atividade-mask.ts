import { Mask } from './mask';

export class AtividadeMask extends Mask {
    public constructor() {
        super([/\d/, /\d/, /\d/, /\d/, '-', /\d/, '/', /\d/, /\d/]);
        super.tornarGuideOff();
    }
}
