import { Mask } from './mask';

export class NumeroOficioMask extends Mask {
    public constructor() {
        super([...Array(10)].map(val => /\d/));
        super.tornarGuideOff();
    }
}
