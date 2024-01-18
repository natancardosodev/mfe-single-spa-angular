import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchFilterPipe } from '../../../core/pipes/filter.pipe';
import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';

@NgModule({
    declarations: [ViewComponent, SearchFilterPipe],
    imports: [CommonModule, ViewRoutingModule]
})
export class ViewModule {}
