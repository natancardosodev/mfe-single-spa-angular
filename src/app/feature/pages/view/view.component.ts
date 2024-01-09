import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosEquipeI } from '@core/interfaces/mapeamento.interface';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { Dados, isNullOrUndefined } from 'lib-vox-shared-codes';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    public equipe: string;
    public dados: Array<DadosEquipeI>;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.equipe = params['equipe'];
        });
    }

    ngOnInit(): void {
        this.getDados();
    }

    public getDados() {
        this.solicitacaoService
            .getProjects(this.equipe)
            .subscribe((projects: Array<{ id: number; nome: string; content: string }>) => {
                if (projects) {
                    projects.forEach((item, index) => {
                        this.solicitacaoService
                            .getPackageOfProject(item.id, environment.token.front)
                            .subscribe((response) => {
                                this.dados.push({
                                    key: item.nome,
                                    value: this.getFields(JSON.parse(atob(response[index].content)).dependencies)
                                });
                            });
                    });
                }
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
