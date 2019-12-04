import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-pesquisa',
  templateUrl: './visualizar-pesquisa.component.html',
  styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  public voltarParaPesquisa(): void {
    window.scrollTo(0, 0);
    this.router.navigate(['']);
  }

}
