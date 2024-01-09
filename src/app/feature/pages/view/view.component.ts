import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProjectsI } from '@core/interfaces/mapeamento.interface';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { Dados, isNullOrUndefined } from 'lib-vox-shared-codes';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    public equipe: string;
    public dataProjects: DataProjectsI;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.equipe = params['equipe'];
        });
        this.dataProjects = null;
    }

    ngOnInit(): void {
        this.getDados();
    }

    public getDados() {
        this.solicitacaoService.getProjects('mock-' + this.equipe).subscribe((response: DataProjectsI) => {
            this.dataProjects = response;
            // @todo aguardar task 338579
            // if (!isNullOrUndefined(this.dataProjects)) {
            //     this.dataProjects.projects.forEach((item, index) => {
            //         this.solicitacaoService
            //             .getPackageOfProject(item.id, environment.token.front)
            //             .subscribe((response) => {
            //                 const libs = [
            //                     ...this.getFields(JSON.parse(atob(response.content)).dependencies),
            //                     ...this.getFields(JSON.parse(atob(response.content)).devDependencies)
            //                 ];
            //                 this.dataProjects.projects[index].libs = libs;
            //             });
            //     });
            // }
        });
    }

    public getFields(parameters: Record<string, string>): Array<Dados> {
        const arrayParametro = [];
        for (const property of Object.keys(parameters)) {
            if (!isNullOrUndefined(parameters[property])) {
                arrayParametro.push({ key: property, value: parameters[property] });
            }
        }

        return arrayParametro;
    }
}
