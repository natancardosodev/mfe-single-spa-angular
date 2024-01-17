/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (!value) return null;
        if (!args) return value;

        args = args
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');

        return value.filter(function (data) {
            return JSON.stringify(data)
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .includes(args);
        });
    }
}
