import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '@feature/services/solicitacao.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    public equipe: string;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.equipe = params['equipe'];
        });
    }

    ngOnInit(): void {}

    public getDados() {
        // this.solicitacaoService.getPackageOfProject().subscribe();
    }
}
