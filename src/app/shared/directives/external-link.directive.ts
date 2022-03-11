import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostBinding, Inject, Input, PLATFORM_ID } from '@angular/core';

@Directive({
    selector: 'a[href]'
})
export class ExternalLinkDirective {
    @HostBinding('attr.rel') relAttr = null;
    @HostBinding('attr.target') targetAttr = null;
    @Input() href: string;

    constructor(@Inject(PLATFORM_ID) private platformId: string, private elementRef: ElementRef<HTMLAnchorElement>) {}

    ngOnChanges() {
        this.elementRef.nativeElement.href = this.href;
        if (this.isLinkExternal()) {
            this.relAttr = 'noopener noreferrer';
            this.targetAttr = '_blank';
        }
    }

    private isLinkExternal() {
        return (
            isPlatformBrowser(this.platformId) && !this.elementRef.nativeElement.hostname.includes(location.hostname)
        );
    }
}
