import { Location } from '@angular/common';
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[backButton]'
})
export class BackButtonDirective {
    @HostBinding('attr.class') class = null;
    @HostBinding('attr.name') name = null;
    @HostBinding('attr.role') role = null;
    @HostBinding('attr.aria-label') aria = null;
    constructor(private location: Location) {}
    @HostListener('click')
    onClick() {
        this.location.back();
    }

    ngOnInit() {
        this.class = 'br-button secondary back-button ml-70 mb-3';
        this.name = 'voltar';
        this.role = 'button';
        this.aria = 'Voltar';
    }
}
