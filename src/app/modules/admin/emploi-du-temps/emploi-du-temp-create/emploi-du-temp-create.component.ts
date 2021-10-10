import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmploiDuTempService } from '../../../../_services/emploi-du-temp.service';
import { EmploiDuTemp } from '../../../../_models/emploi-du-temp.model';
import { ModuleService } from '../../../../_services/module.service';
import { ClasseService } from '../../../../_services/classe.service';
import { Module } from '../../../../_models/module.model';
import { Classe } from '../../../../_models/classe.model';
import { PlanEtudeService } from '../../../../_services';
import { Societe } from '../../../../_models/societe.model';
import { MatTableDataSource } from '@angular/material/table';
import { EmploiDuTempsTableModel } from '../../../../_models/emploi-du-temps-table.model';

interface IResult {
  lundi: string[];
  mardi: string[];
  mercredi: string[];
  jeudi: string[];
  vendredi: string[];
  samedi: string[];
}

@Component({
  selector: 'app-emploi-du-temp-create',
  templateUrl: './emploi-du-temp-create.component.html',
  styleUrls: ['./emploi-du-temp-create.component.css']
})
export class EmploiDuTempCreateComponent implements OnInit {
  public errorMessage = '';
  public emploiDuTempForm: FormGroup;
  public modules: Module[] = [];
  public classes: Classe[] = [];
  public annees: Societe[] = [];
  public originalData: any = null;
  public canSave: boolean = false;
  displayedColumns: string[] =
    ['jour', '8h->9h', '9h->10h', '10h-12h', '12h->13h', '13h->14h', '14h->15h', '15h->16h', '16h->17h'];

  public dataSource = new MatTableDataSource<EmploiDuTempsTableModel>()

  constructor(private repo: EmploiDuTempService,
    private repoModule: ModuleService,
    private repoClasse: ClasseService,
    private repoPlanEtude: PlanEtudeService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private location: Location,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.repoModule.getAllModulesTest().subscribe((modules) => {
      this.modules = modules;
    });
    this.repoClasse.getAllClassesTest().subscribe((classes) => {
      this.classes = classes;
    });
    this.repoPlanEtude.getAnnees().subscribe((societe) => {
      this.annees = societe;
    });
    this.emploiDuTempForm = new FormGroup({
      // codeModule: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      annee: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      semestre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      codeClasse: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      // numSeance: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      // jour: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      // typeSeance: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.emploiDuTempForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createEmploiDuTemp = (emploiDuTempFormValue) => {
    console.log('AA', this.emploiDuTempForm, emploiDuTempFormValue);
    if (this.emploiDuTempForm.valid) {
      this.executeEmploiDuTempCreation(emploiDuTempFormValue);
    }
  }

  private executeEmploiDuTempCreation = (emploiDuTempFormValue) => {
    const emploiDuTemp: EmploiDuTemp = {
      // codeModule: emploiDuTempFormValue.codeModule,
      anneeDeb: emploiDuTempFormValue.annee,
      semestre: emploiDuTempFormValue.semestre,
      codeCl: emploiDuTempFormValue.codeClasse,
      // numSeance: emploiDuTempFormValue.numSeance,
      // jour: emploiDuTempFormValue.jour,
      // typeSeance: emploiDuTempFormValue.typeSeance,
    };

    const apiUrl = 'api/EmploiDuTemp/GenerateEmploiDuTemp/';
    this.repo.getData(apiUrl + emploiDuTemp.codeCl + '/' + emploiDuTemp.anneeDeb + '/' + emploiDuTemp.semestre)
      .subscribe((res: IResult) => {
        // this is temporary, until we create our dialogs
        console.log('Emploi', res);
        this.originalData = res;
        // this.location.back();
        let data = [];
        for (let i = 0; i < 6; i++) {
          data.push({
            jour: Object.keys(res)[i],
            first: res[Object.keys(res)[i]][0],
            second: res[Object.keys(res)[i]][1],
            third: res[Object.keys(res)[i]][2],
            fourth: res[Object.keys(res)[i]][3],
            fifth: res[Object.keys(res)[i]][4],
            sixth: res[Object.keys(res)[i]][5],
          })
        }
        this.dataSource.data = data;
        if (data.length > 0){
          this.canSave = true;
        }
        this.changeDetector.detectChanges();
      },
        (error => {
          // temporary as well
          // this.location.back();
        })
      );
  }

  public handleSave = (): void => {
    Object.keys(this.originalData).map((day) => {
      this.originalData[day].map((matiere, idx) => {
        const body = {
          CodeModule: matiere,
          AnneeDeb: this.emploiDuTempForm.value.annee,
          Semestre: parseInt(this.emploiDuTempForm.value.semestre, 10),
          CodeCl: this.emploiDuTempForm.value.codeClasse,
          NumSeance: idx,
          Jour: day,
          TypeSeance: 'N'
        };
        this.repo.create('api/EmploiDuTemp', body).subscribe((res)=>{
          console.log('RES', res);
        });
      });
    });
  }

  public redirectToEmploiDuTempList(): void {
    // this.router.navigate(['/emploi-du-temp-list']);
  }
}
