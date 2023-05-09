/* eslint-disable no-console */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExternalFilesService {
    public loadedCss: BehaviorSubject<Array<string>> = new BehaviorSubject([]);

    constructor(@Inject(DOCUMENT) private document: Document) {}

    public loadCss(filename: string, domain = '', hash = ''): void {
        if (!this.hasStyle(domain, filename, hash)) {
            const headEl = this.document.getElementsByTagName('head')[0];
            const newLink = this.document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = `${domain}${filename}${hash}.css`;
            this.loadedCss.value.push(filename);
            newLink.addEventListener('load', () => this.loadedCss.next(this.loadedCss.value), false);
            headEl.appendChild(newLink);
            return;
        }
        this.checkErros(domain, filename);
    }

    public loadJs(filename: string, domain = '', hash = ''): void {
        if (!this.hasScript(domain, filename, hash)) {
            const headEl = this.document.getElementsByTagName('head')[0];
            const newLink = this.document.createElement('script');
            newLink.src = `${domain}${filename}${hash}.js`;
            newLink.setAttribute('async', '');
            headEl.appendChild(newLink);
            return;
        }
        this.checkErros(domain, filename);
    }

    public loadIcone(filename: string, domain = '', hash = ''): void {
        const headEl = this.document.getElementsByTagName('head')[0];
        const newLink = this.document.createElement('link');
        newLink.rel = 'icon';
        newLink.type = 'image/x-icon';
        newLink.href = `${domain}${filename}.ico?v=${hash}`;
        headEl.appendChild(newLink);
    }

    public hasStyle(domain: string, filename: string, hash = ''): boolean {
        return this.document.querySelectorAll(`link[href="${domain}${filename}${hash}.css"]`).length > 0;
    }

    public hasScript(domain: string, filename: string, hash = ''): boolean {
        return this.document.querySelectorAll(`script[src="${domain}${filename}${hash}.js"]`).length > 0;
    }

    public checkErros(domain: string, filename: string): void {
        console.error(`Erro: O arquivo a seguir já foi carregado: ${domain}${filename}`);
    }
}
