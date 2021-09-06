import {Component, OnInit} from '@angular/core';
import {PlanEtudeService} from '../../../../_services';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlanEtude} from '../../../../_models/plan-etude.model';

declare var $: any;

@Component({
  selector: 'app-plan-etude-update',
  templateUrl: './plan-etude-update.component.html',
  styleUrls: ['./plan-etude-update.component.css']
})
export class PlanEtudeUpdateComponent implements OnInit {
  public errorMessage = '';
  public planEtude: PlanEtude;
  public planEtudeForm: FormGroup;
  public currentYear = new Date().getFullYear();

  constructor(private repo: PlanEtudeService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.planEtudeForm = new FormGroup({
      codeModule: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][A-Z][A-Z][1-9]$/), Validators.maxLength(60)]),
      codeClasse: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      annee: new FormControl('', [Validators.required, Validators.min(this.currentYear),  Validators.maxLength(60)]),
      idEnseignant: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.getPlanEtudeById();
  }

  private getPlanEtudeById = () => {
    const planEtudeId = this.activeRoute.snapshot.params.id;

    const planEtudeByIdUrl = `api/Admin/${planEtudeId}`;
    this.repo.getData(planEtudeByIdUrl)
      .subscribe(res => {
          this.planEtude = res as PlanEtude;
          this.planEtudeForm.patchValue(this.planEtude);
          $('#id').val(planEtudeId);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public updatePlanEtude = (planEtudeFormValue) => {
    if (this.planEtudeForm.valid) {
      this.executePlanEtudeUpdate(planEtudeFormValue);
    }
  }

  private executePlanEtudeUpdate = (planEtudeFormValue) => {
    this.planEtude.codeCl = planEtudeFormValue.codeClasse;
    this.planEtude.idEns = planEtudeFormValue.idEnseignant;
    const apiUrl = `api/PlanEtude/${this.planEtude.codeCl}`;
    this.repo.update(apiUrl, this.planEtude)
      .subscribe(res => {
          $('#successModal').modal();
        },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public validateControl = (controlName: string) => {
    return this.planEtudeForm.controls[controlName].invalid &&
      this.planEtudeForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.planEtudeForm.controls[controlName].hasError(errorName);
  }

  public redirectToPlanEtudeList = () => {
    this.router.navigate(['/plan-etude-list']);
  }

}
