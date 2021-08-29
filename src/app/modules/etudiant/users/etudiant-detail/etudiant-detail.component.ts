import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/_models/etudiant.model';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';

@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.component.html',
  styleUrls: ['./etudiant-detail.component.css']
})
export class EtudiantDetailComponent implements OnInit {
  public etudiant: Etudiant;

  constructor(private repo: EtudiantService, private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getEtudiantDetails();
  }

  private getEtudiantDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/Etudiants/${id}`;

    this.repo.getData(apiUrl)
      .subscribe(res => {
        this.etudiant = res as Etudiant;
      },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }
}
