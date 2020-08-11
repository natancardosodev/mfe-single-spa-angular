import { Component, OnInit, Input } from '@angular/core';

import { MenuFuncionalidade } from 'lib-menu';
import { UrlUtilService } from './../../services/url-util.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
    @Input() public getFuncionalidade: MenuFuncionalidade;
    public paramsRoute: any;
    public breadCrumbs: Array<Record<string, string>>;

    constructor(private urlUtilService: UrlUtilService) {}

    public ngOnInit(): void {
        this.breadCrumbs = [
            {
                item: 'Início',
                route: this.urlUtilService.getUrlProjeto('/')
            },
            {
                item: this.getFuncionalidade && this.getFuncionalidade.nome,
                route: this.getFuncionalidade && this.getFuncionalidade.rota
            }
        ];
    }
}
