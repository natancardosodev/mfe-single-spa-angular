import { Mask } from './mask';

export class NumeroBloqueioMask extends Mask {
    public constructor() {
        super([...Array(20)].map(val => /\d/));
        super.tornarGuideOff();
    }
}
