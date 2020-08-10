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

    private $valueInput: string;

    constructor(
        private $localeService: BsLocaleService,
        private $renderer: Renderer2,
        private $elementRef: ElementRef
    ) {
        this.configDatepicker = config;
        this.$localeService.use(locale);
    }

    ngAfterViewInit(): void {
        this.$renderer.removeAttribute(this.$elementRef.nativeElement, 'id');
    }

    writeValue(value: string): void {
        if (value !== undefined) {
            this.$valueInput = value;
            this.propagateChange(this.$valueInput);
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
        return this.$valueInput;
    }

    set value(val: string) {
        if (val) {
            this.$valueInput = val;
            this.propagateChange(this.$valueInput);
        }
    }

    public clearValue(): void {
        this.$valueInput = null;
        this.propagateChange(this.$valueInput);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public onKeydownDate(event: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access
        event.preventDefault();
    }
}
