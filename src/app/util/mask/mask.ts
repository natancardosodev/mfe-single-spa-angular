import { conformToMask } from 'angular2-text-mask';

export class Mask {
    public mask: Array<any>;
    public guide: boolean;

    public constructor(mask: Array<any>) {
        this.mask = mask;
        this.guide = true;
    }

    public apply(dados: string): any {
        return conformToMask(dados, this.mask, {guide: false}).conformedValue;
    }

    public tornarGuideOff(): void {
        this.guide = false;
    }
}
