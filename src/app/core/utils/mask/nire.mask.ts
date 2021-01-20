import { Mask } from './mask';

export class NireMask extends Mask {
    public constructor() {
        super([...Array(11)].map(() => /\d/));
        super.tornarGuideOff();
    }
}
