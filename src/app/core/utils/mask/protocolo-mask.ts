import { Mask } from './mask';

export class ProtocoloMask extends Mask {
    public constructor() {
        super([/[a-z|A-Z]/, /[a-z|A-Z]/, /[a-z|A-Z]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]);
        super.tornarGuideOff();
    }
}
