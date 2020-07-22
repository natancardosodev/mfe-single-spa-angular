import { Mask } from './mask';

export class DddMask extends Mask {
    public constructor() {
        super([/\d/, /\d/]);
    }
}
