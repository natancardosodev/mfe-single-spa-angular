import { Component, forwardRef, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { config, locale } from './datepicker';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputDateComponent),
            multi: true
        }
    ]
})
export class InputDateComponent implements ControlValueAccessor, AfterViewInit {
    @Input() public id?: string;
    @Input() public isValid: boolean;
    @Input() public mensagemStatus: string;
    @Input() public maxDate: string;
    @Input() public minDate: string;

    public configDatepicker: object;

    private $valueInput: string;

    constructor(
        private $localeService: BsLocaleService,
        private $renderer: Renderer2,
        private $elementRef: ElementRef
    ) {
        this.configDatepicker = config;
        this.$localeService.use(locale);
    }

    ngAfterViewInit() {
        this.$renderer.removeAttribute(this.$elementRef.nativeElement, 'id');
    }

    writeValue(value: any) {
        if (value !== undefined) {
            this.$valueInput = value;
            this.propagateChange(this.$valueInput);
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    get value() {
        return this.$valueInput;
    }

    set value(val) {
        if (val) {
            this.$valueInput = val;
            this.propagateChange(this.$valueInput);
        }
    }

    public clearValue(): void {
        this.$valueInput = null;
        this.propagateChange(this.$valueInput);
    }

    public onKeydownDate(event: any): void {
        event.preventDefault();
    }
}
