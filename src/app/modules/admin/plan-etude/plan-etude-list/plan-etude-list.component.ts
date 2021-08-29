import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { PlanEtudeService } from '../../../../_services/plan-etude.service';

@Component({
  selector: 'app-plan-etude-list',
  templateUrl: './plan-etude-list.component.html',
  styleUrls: ['./plan-etude-list.component.css']
})
export class PlanEtudeListComponent implements OnInit {
  // public planEtude: PlanEtude;
  constructor(private repo: PlanEtudeService, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  private getPlanEtudeDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl = `api/Decids/${id}`;


  }
}
