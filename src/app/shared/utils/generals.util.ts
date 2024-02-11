import { DominioPortais } from '../enums/portais-sigfacil.enum';
import { isNullOrUndefined } from './manipulate-data';

export function delay(ms: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function idGenerator(label: string, idExtra?: number | string): string {
    if (label === undefined) {
        const radomNumber = Math.floor(Math.random() * 100);
        return `field-${radomNumber}`;
    }

    label = !isNullOrUndefined(idExtra) ? `${label}-${idExtra?.toString()}` : label;

    return label
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\ +/g, '-')
        .replace(/\//g, '-')
        .replace(/\./g, '')
        .toLowerCase();
}

export const blockReloadPage = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return (e.returnValue = '');
};

export function activeBlockReloadPage() {
    window.addEventListener('beforeunload', blockReloadPage);
}

export function disableBlockReloadPage() {
    window.removeEventListener('beforeunload', blockReloadPage, false);
}

export function montarUrlPortais(env: Array<string>, dominios: Array<string>, baseHref: string): string {
    const urls = env.map((ambiente) => {
        return dominios.map((sigla) => {
            return `https://${ambiente}.${DominioPortais[sigla.toUpperCase()]}/${baseHref}`;
        });
    });

    return `'${urls.toString().split(',').join("', '")}'`;
}

export function downloadPDF(documentoBase64: Blob, filename?: string): void {
    const downloadURL = window.URL.createObjectURL(documentoBase64);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = filename ? filename + '.pdf' : 'documento.pdf';
    link.click();
    URL.revokeObjectURL(downloadURL);
}

export function getCookie(nome: string): string | null {
    const name = nome + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}
