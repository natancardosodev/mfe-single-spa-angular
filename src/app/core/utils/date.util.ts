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
export function getDateTimeUTC(date?): string {
    const objDate = date ? new Date(date) : new Date();
    const utc = objDate.toString().split('-')[1];

    return (
        new Date(objDate.getTime() - objDate.getTimezoneOffset() * 60000).toISOString().replace('Z', '').split('.')[0] +
        '+' +
        utc.substr(0, 2) +
        ':' +
        utc.substr(2, 2)
    );
}

/**
 * Formating date from YYYY-MM-DD to MM/DD/YYYY
 * @param date string
 */
export function formatDateEnToBr(date: string): string {
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
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}
