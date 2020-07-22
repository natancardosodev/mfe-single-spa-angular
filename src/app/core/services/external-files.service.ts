import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExternalFilesService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    public loadCss(url: string): void {
        const headEl = this.document.getElementsByTagName('head')[0];
        const newLink = this.document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = url;
        headEl.appendChild(newLink);
    }

    public loadJs(url: string): void {
        const headEl = this.document.getElementsByTagName('head')[0];
        const newLink = this.document.createElement('script');
        newLink.src = url;
        headEl.appendChild(newLink);
    }

    public loadIcone(url: string): void {
        const headEl = this.document.getElementsByTagName('head')[0];
        const newLink = this.document.createElement('link');
        newLink.rel = 'icon';
        newLink.type = 'image/x-icon';
        newLink.href = url;
        headEl.appendChild(newLink);
    }
}
