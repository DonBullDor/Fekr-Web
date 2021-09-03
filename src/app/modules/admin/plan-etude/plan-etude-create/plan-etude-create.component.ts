import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandlerService} from 'src/app/_services/error-handler.service';
import {PlanEtudeService} from 'src/app/_services/plan-etude.service';
import {Location} from '@angular/common';
import {PlanEtude} from '../../../../_models/plan-etude.model';

@Component({
  selector: 'app-plan-etude-create',
  templateUrl: './plan-etude-create.component.html',
  styleUrls: ['./plan-etude-create.component.css']
})
export class PlanEtudeCreateComponent implements OnInit {
  public errorMessage = '';
  public planEtudeForm: FormGroup;

  constructor(private repo: PlanEtudeService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              public location: Location) {
  }

  ngOnInit(): void {
    this.planEtudeForm = new FormGroup({
      codeModule: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      codeClasse: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      annee: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      idEnseignant: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.planEtudeForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createPlanEtude = (planEtudeFormValue) => {
    console.log(planEtudeFormValue);
    if (this.planEtudeForm.valid) {
      this.executePlanEtudeCreation(planEtudeFormValue);
    }
  }

  private executePlanEtudeCreation = (planEtudeFormValue) => {
    const plan: PlanEtude = {
      codeModule: planEtudeFormValue.id,
      codeCl: planEtudeFormValue.codeClasse,
      anneeDeb: planEtudeFormValue.annee,
      idEns: planEtudeFormValue.idEnseignant
    };

    const apiUrl = 'api/PlanEtude';
    this.repo.create(apiUrl, plan)
      .subscribe(res => {
          // this is temporary, until we create our dialogs
          this.location.back();
        },
        (error => {
          // temporary as well
          this.location.back();
        })
      );
  }

  public redirectToAdminList(): void {
    this.router.navigate(['/admin-list']);
  }
}
