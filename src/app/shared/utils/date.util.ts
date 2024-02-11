/**
 * @returns YYYY-MM-DD HH:mm:ss
 */
export function getDateTime(): string {
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
export function getDateTimeUTC(date?: string | number | Date, fixDate?: boolean): string {
    const objDate = date ? new Date(date) : new Date();
    const utc = objDate.toString().split('-')[1];

    const rightDay = Number(objDate.toString().split(' ')[2]) + 1;
    const dateArr = objDate.toString().split(' ');
    dateArr.splice(2, 1, rightDay.toString());
    const objDateFix = new Date(dateArr.join(' '));

    return (
        new Date(
            (fixDate ? objDateFix.getTime() : objDate.getTime()) -
                (fixDate ? objDateFix.getTimezoneOffset() : objDate.getTimezoneOffset()) * 60000
        )
            .toISOString()
            .replace('Z', '')
            .split('.')[0] +
        '+' +
        utc.slice(0, 2) +
        ':' +
        utc.slice(2, 4)
    );
}

/**
 * Formating date from YYYY-MM-DD to MM/DD/YYYY
 * @param date string
 */
export function formatDateEnToBr(date: string): string {
    if (!date) {
        return null;
    }

    if (date.split(' ').length > 1) {
        date = date.split(' ')[0];
    }

    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

/**
 * Formating date from MM/DD/YYYY to YYYY-MM-DD
 * @param date string
 */
export function formatDateBrToEn(date: string) {
    if (!date) {
        return null;
    }

    if (date.toString().indexOf('GMT') !== -1) {
        return new Date(date).toLocaleDateString('fr-CA', { timeZone: 'UTC' });
    }

    if (date.split(' ').length > 1) {
        date = date.split(' ')[0];
    }

    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}

export function isDateFormatPTBR(dateString: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;

    return regex.test(dateString);
}

export function separeDatesRange(date: string): Record<string, any> {
    const dateSplit = date.toString().split(' - ');

    return {
        dataInicial: dateSplit[0],
        dataFinal: dateSplit[1]
    };
}

export function joinDatesRange(dateInicial: string, dateFinal: string): string {
    return `${dateInicial} - ${dateFinal}`;
}
