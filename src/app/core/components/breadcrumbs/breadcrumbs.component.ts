import { Component, OnInit, Input } from '@angular/core';
import { UrlUtilService } from './../../services/url-util.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
    @Input() public getFuncionalidade: any;
    public paramsRoute: any;

    constructor(private urlUtilService: UrlUtilService) {}

    ngOnInit() {}

    public mountBreadCrumbs() {
        const breadCrumbs = [
            {
                item: 'Início',
                route: this.urlUtilService.getUrlProjeto('/')
            },
            {
                item: this.getFuncionalidade && this.getFuncionalidade.nome,
                route: this.getFuncionalidade && this.getFuncionalidade.rota
            }
        ];

        return breadCrumbs;
    }
}
