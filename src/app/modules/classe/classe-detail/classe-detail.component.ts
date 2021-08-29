import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classe } from 'src/app/_models/classe.model';
import { ClasseService } from 'src/app/_services/classe.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.css']
})
export class ClasseDetailComponent implements OnInit {
  public classe: Classe;
  constructor(private repo: ClasseService, private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getClasseDetails();
  }

  private getClasseDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/Classes/${id}`;

    this.repo.getData(apiUrl)
    .subscribe(res => {
      this.classe = res as Classe;
    },
    (error) => {
      this.errorHandler.handleError(error);
      console.log(error);
    });
  }
}
