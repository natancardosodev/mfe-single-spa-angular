import { Directive, HostListener } from '@angular/core';
@Directive({
    selector: '[uppercase]'
})
export class UppercaseDirective {
    constructor() {}

    @HostListener('input', ['$event'])
    public onKeyUp(event: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        event.target['value'] = event.target['value'].toUpperCase();
    }
}
