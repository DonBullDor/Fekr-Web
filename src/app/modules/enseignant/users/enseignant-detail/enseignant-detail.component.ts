import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enseignant } from 'src/app/_models/enseignant.model';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-enseignant-detail',
  templateUrl: './enseignant-detail.component.html',
  styleUrls: ['./enseignant-detail.component.css']
})
export class EnseignantDetailComponent implements OnInit {
  public enseignant: Enseignant;
  constructor(private repo: EnseignantService, private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getEnseignantDetails();
  }

  private getEnseignantDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/Enseignants/${id}`;

    this.repo.getData(apiUrl)
    .subscribe(res => {
      this.enseignant = res as Enseignant;
    },
    (error) => {
      this.errorHandler.handleError(error);
    });
  }
}
