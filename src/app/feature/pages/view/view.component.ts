import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProjectsI } from '@core/interfaces/mapeamento.interface';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { Dados, StorageUtil, isNullOrUndefined } from 'lib-vox-shared-codes';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    public equipe: string;
    public dataProjects: DataProjectsI;
    public showDetails: boolean = true;
    public showLibs: boolean = true;
    public showMoreLibs: boolean = true;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.equipe = params['equipe'];
        });
        this.dataProjects = StorageUtil.get('data_' + this.equipe);
    }

    ngOnInit(): void {
        this.getDados();
    }

    public getDados() {
        if (!this.dataProjects) {
            this.solicitacaoService.getProjects(this.equipe).subscribe((response: DataProjectsI) => {
                this.dataProjects = response;
                StorageUtil.store('data_' + this.equipe, this.dataProjects);

                if (!isNullOrUndefined(this.dataProjects)) {
                    this.dataProjects.projects.forEach((item, index) => {
                        this.solicitacaoService
                            .getPackageOfProject(item.id, environment.token.front)
                            .subscribe((response) => {
                                const libs = [
                                    ...this.getFields(JSON.parse(atob(response.content)).dependencies),
                                    ...this.getFields(JSON.parse(atob(response.content)).devDependencies)
                                ];
                                this.dataProjects.projects[index].libs = libs;
                            });
                    });
                }
            });
        }
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

    public showHideDetails() {
        this.showDetails = !this.showDetails;
    }

    public showHideLibs() {
        this.showLibs = !this.showLibs;
    }

    public reloadData(): void {
        StorageUtil.remove('data_' + this.equipe);
        window.location.reload();
    }
}
