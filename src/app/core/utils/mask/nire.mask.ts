import { Mask } from './mask';

export class NireMask extends Mask {
    public constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        super([...Array(11)].map(() => /\d/));
        super.tornarGuideOff();
    }
}
