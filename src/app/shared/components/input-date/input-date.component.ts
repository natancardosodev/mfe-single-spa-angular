import { Component, forwardRef, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
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

    public configDatepicker: Partial<BsDatepickerConfig>;

    private _valueInput: string;

    constructor(
        private _localeService: BsLocaleService,
        private _renderer: Renderer2,
        private _elementRef: ElementRef
    ) {
        this.configDatepicker = config;
        this._localeService.use(locale);
    }

    ngAfterViewInit(): void {
        this._renderer.removeAttribute(this._elementRef.nativeElement, 'id');
    }

    writeValue(value: string): void {
        if (value !== undefined) {
            this._valueInput = value;
            this.propagateChange(this._valueInput);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
    propagateChange = (_: any): void => {};

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    registerOnChange(fn: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.propagateChange = fn;
    }

    registerOnTouched(): void {}

    get value(): string {
        return this._valueInput;
    }

    set value(val: string) {
        if (val) {
            this._valueInput = val;
            this.propagateChange(this._valueInput);
        }
    }

    public clearValue(): void {
        this._valueInput = null;
        this.propagateChange(this._valueInput);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public onKeydownDate(event: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access
        event.preventDefault();
    }
}
