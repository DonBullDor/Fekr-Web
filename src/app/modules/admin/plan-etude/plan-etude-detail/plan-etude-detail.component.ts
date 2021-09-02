import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { PlanEtude } from '../../../../_models/plan-etude.model';
import { PlanEtudeService } from '../../../../_services/plan-etude.service';

@Component({
  selector: 'app-plan-etude-detail',
  templateUrl: './plan-etude-detail.component.html',
  styleUrls: ['./plan-etude-detail.component.css']
})
export class PlanEtudeDetailComponent implements OnInit {
  public planEtude: PlanEtude;

  constructor(private repo: PlanEtudeService,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getPlanEtudeDetails();
  }

  private getPlanEtudeDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/PlanEtude/${id}`;

    this.repo.getData(apiUrl)
      .subscribe(res => {
          this.planEtude = res as PlanEtude;
        },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }
}
