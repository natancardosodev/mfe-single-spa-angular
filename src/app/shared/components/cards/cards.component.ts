import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() mask: string;
    @Input() date: string;

    constructor() {}

    public ngOnInit(): void {}
}
