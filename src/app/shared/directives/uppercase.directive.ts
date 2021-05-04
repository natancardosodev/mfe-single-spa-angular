/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Directive, HostListener } from '@angular/core';
@Directive({
    selector: '[uppercase]'
})
export class UppercaseDirective {
    constructor() {}

    @HostListener('input', ['$event'])
    public onKeyUp(event: any) {
        event.target['value'] = event.target['value'].toUpperCase();
    }
}
