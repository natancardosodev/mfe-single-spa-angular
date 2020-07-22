import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-title-page',
    templateUrl: './title-page.component.html',
    styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {
    @Input() public title: string;
    @Input() public subtitle: string;
    @Input() public showButton = false;
    @Input() public titleButton: string;
    @Input() public link: string;

    constructor() {}

    ngOnInit(): void {}
}
