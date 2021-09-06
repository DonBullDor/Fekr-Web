import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandlerService} from 'src/app/_services/error-handler.service';
import {PlanEtudeService} from 'src/app/_services/plan-etude.service';
import {Location} from '@angular/common';
import {PlanEtude} from '../../../../_models/plan-etude.model';
import {Module} from '../../../../_models/module.model';
import {ModuleService} from '../../../../_services/module.service';
import {Classe} from '../../../../_models/classe.model';
import {ClasseService} from '../../../../_services/classe.service';
import {MatSelectChange} from "@angular/material/select";
import {EnseignantService} from "../../../../_services/enseignant.service";
import {Enseignant} from "../../../../_models/enseignant.model";
import {Societe} from "../../../../_models/societe.model";

@Component({
  selector: 'app-plan-etude-create',
  templateUrl: './plan-etude-create.component.html',
  styleUrls: ['./plan-etude-create.component.css']
})
export class PlanEtudeCreateComponent implements OnInit {
  public errorMessage = '';
  public planEtudeForm: FormGroup;
  public modules: Module[] = [];
  public classes: Classe[] = [];
  public enseignants: Enseignant[] = [];
  public annees: Societe[] = [];
  constructor(private repoEns: EnseignantService,
              private repoClasse: ClasseService,
              private repoModule: ModuleService,
              private repo: PlanEtudeService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              public location: Location) {
  }

  ngOnInit(): void {
    this.repoModule.getAllModulesTest().subscribe((modules) => {
      this.modules = modules;
    });
    this.repoClasse.getAllClassesTest().subscribe((classes) => {
      this.classes = classes;
    });
    this.repo.getAnnees().subscribe((societe) => {
      this.annees = societe;
    });
    this.repoEns.getAllEnseignantsTest().subscribe((enseignants) => {
      this.enseignants = enseignants;
    });
    this.planEtudeForm = new FormGroup({
      codeModule: new FormControl('', [Validators.required, Validators.pattern(/\d{3}\w{3}\d{4}/gm), Validators.maxLength(60)]),
      codeClasse: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      annee: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      idEnseignant: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  public handleChange = (e: MatSelectChange) => {
    console.log('Change Event', e);
    this.repoModule.getAllModules();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.planEtudeForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createPlanEtude = (planEtudeFormValue) => {
    console.log(planEtudeFormValue);
    // if (this.planEtudeForm.valid) {
    this.executePlanEtudeCreation(planEtudeFormValue);
    // }
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
