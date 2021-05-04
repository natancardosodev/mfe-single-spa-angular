import { Router } from '@angular/router';
import { RotasEnum } from '@core/enums/rotas.enum';

export class GeneralsUtil {
    public static delay(ms: number): Promise<any> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public static isEmpty(dado: Record<string, string>): boolean {
        return !Object.keys(dado).length;
    }

    public static navigate(routerInstance: Router, rotaAlvo: RotasEnum, routeParam: string | number = null) {
        window.scrollTo(0, 0);
        const comandos = routeParam ? [].concat(rotaAlvo, routeParam) : [rotaAlvo];
        void routerInstance.navigate(comandos);
    }

    /**
     * @returns YYYY-MM-DD HH:mm:ss
     */
    public static getDateTime(): string {
        const date = new Date();
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .replace('T', ' ')
            .replace('Z', '')
            .split('.')[0];
    }

    /**
     * @returns YYYY-MM-DDTHH:mm:ss+00:00
     */
    public static getDateTimeUTC(date = null): string {
        const objDate = new Date(date);
        const utc = objDate.toString().split('-')[1];

        return (
            new Date(objDate.getTime() - objDate.getTimezoneOffset() * 60000)
                .toISOString()
                .replace('Z', '')
                .split('.')[0] +
            '+' +
            utc.substr(0, 2) +
            ':' +
            utc.substr(2, 2)
        );
    }

    /**
     * Formating date from YYYY-MM-DD to MM/DD/YYYY
     * Alternativa ao new Date().toLocaleDateString('pt-BR')
     * usado no loadProcessoSession() do component
     * @param date string
     */
    public static formatDateEnToBr(date: string): string {
        // const [year, month, day] = date.split('-');
        // return `${day}/${month}/${year}`;
        return new Date(date).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    }

    /**
     * Formating date from MM/DD/YYYY to YYYY-MM-DD
     * Alternativa ao new Date().toLocaleDateString('fr-CA')
     * usado no getDados() do form e parseDados() do component
     * @param date string
     */
    public static formatDateBrToEn(date: string) {
        if (date.toString().includes('GMT')) {
            return new Date(date).toLocaleDateString('fr-CA');
        }

        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }
}
