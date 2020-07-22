import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlePageComponent } from './title-page.component';

@NgModule({
    declarations: [TitlePageComponent],
    imports: [CommonModule],
    exports: [TitlePageComponent]
})
export class TitlePageModule {}
