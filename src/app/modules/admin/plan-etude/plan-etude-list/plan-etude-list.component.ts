import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { PlanEtudeService } from '../../../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { PlanEtude } from '../../../../_models/plan-etude.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModuleService } from '../../../../_services/module.service';
import { ClasseService } from '../../../../_services/classe.service';
import { Module } from '../../../../_models/module.model';
import { Classe } from '../../../../_models/classe.model';
import { Enseignant } from '../../../../_models/enseignant.model';
import { Societe } from '../../../../_models/societe.model';
import { EnseignantService } from '../../../../_services/enseignant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plan-etude-list',
  templateUrl: './plan-etude-list.component.html',
  styleUrls: ['./plan-etude-list.component.css']
})
export class PlanEtudeListComponent implements OnInit, AfterViewInit {
  public planEtudeForm: FormGroup;
  public modules: Module[] = [];
  public classes: Classe[] = [];
  public enseignants: Enseignant[] = [];
  public annees: Societe[] = [];
  displayedColumns: string[] = ['module', 'classe', 'annee', 'idEnseignant', 'detail', 'update'];
  public dataSource = new MatTableDataSource<PlanEtude>();
  public columnsFilters = {};

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoModule: ModuleService,
    private repoClasse: ClasseService,
    private repoEnseignant: EnseignantService,
    private repo: PlanEtudeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private errorService: ErrorHandlerService) {
  }

  ngOnInit(): void {
      this.repoModule.getAllModulesTest().subscribe((modules) => {
        this.modules = modules;
      })


    this.repoClasse.getAllClassesTest().subscribe((classes) => {
      this.classes = classes;
    })

    this.repo.getAnnees().subscribe((societe) => {
      this.annees = societe;
    })

    this.repoEnseignant.getAllEnseignantsTest().subscribe((enseignants) => {
      this.enseignants = enseignants;
    })

    this.planEtudeForm = new FormGroup({
      // codeModule: new FormControl(this.modules[0].codeModule, [Validators.required, Validators.pattern(/\d{3}\w{3}\d{4}/gm), Validators.maxLength(60)]),
      codeClasse: new FormControl(this.classes[0].codeCl, [Validators.required, Validators.maxLength(60)]),
      annee: new FormControl(this.annees[0].anneeDeb, [Validators.required, Validators.maxLength(60)]),
      idEnseignant: new FormControl(this.enseignants[0].idEns, [Validators.required, Validators.maxLength(60)]),
      numSemestre: new FormControl(1, Validators.required)
    });
    this.getAllPlansEtudes();
  }

  public getAllPlansEtudes = () => {
    console.log("hehe")
    const apiUrl = 'api/PlanEtude/' + this.planEtudeForm.value.codeModule + '/' + this.planEtudeForm.value.codeClasse + '/' + this.planEtudeForm.value.annee + '/' + this.planEtudeForm.value.numSemestre;
    this.repo.getData(apiUrl)
      .subscribe(res => {
        this.dataSource.data = res as PlanEtude[];
      },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  public getAllPlansEtudesByCriteria = (values) => {
    console.error("CRITERIA")
    let listcriteria = [];
    values.idEnseignant ? listcriteria.push(values.idEnseignant) : null
    values.codeClasse ? listcriteria.push(values.codeClasse) : null
    values.annee ? listcriteria.push(values.annee) : null
    values.numSemestre ? listcriteria.push(values.numSemestre) : null
    const item = {
      id: 12,
      listcriteria
    };
    this.repo.getDataByCriteria('api/PlanEtude/GetAllPlanEtudeByCritere', item)
      .subscribe(res => {
        this.dataSource.data = res as PlanEtude[];
      },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  get planEtudes(): PlanEtude[] {
    return this.repo.planEtudes;
  }

  get planEtude(): PlanEtude {
    return this.repo.planEtude;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/plan-etude-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  private filter(): void {

    this.dataSource.filterPredicate = (data: PlanEtude, filter: string) => {

      let find = true;

      for (const columnName in this.columnsFilters) {

        const currentData = '' + data[columnName];

        // if there is no filter, jump to next loop, otherwise do the filter.
        if (!this.columnsFilters[columnName]) {
          return;
        }

        let searchValue = this.columnsFilters[columnName].contains;

        if (!!searchValue && currentData.indexOf('' + searchValue) < 0) {

          find = false;
          // exit loop
          return;
        }

        searchValue = this.columnsFilters[columnName].equals;

        if (!!searchValue && currentData !== searchValue) {
          find = false;
          // exit loop
          return;
        }

        searchValue = this.columnsFilters[columnName].greaterThan;

        if (!!searchValue && currentData <= searchValue) {
          find = false;
          // exit loop
          return;
        }

        searchValue = this.columnsFilters[columnName].lessThan;

        if (!!searchValue && currentData >= searchValue) {
          find = false;
          // exit loop
          return;
        }

        searchValue = this.columnsFilters[columnName].startWith;

        if (!!searchValue && !currentData.startsWith('' + searchValue)) {
          find = false;
          // exit loop
          return;
        }

        searchValue = this.columnsFilters[columnName].endWith;

        if (!!searchValue && !currentData.endsWith('' + searchValue)) {
          find = false;
          // exit loop
          return;
        }
      }
      return find;

    };

    this.dataSource.filter = null;
    this.dataSource.filter = 'activate';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Create a filter for the column name and operate the filter action.
   */

  applyFilter(columnName: string, operationType: string, searchValue: string): void {

    this.columnsFilters[columnName] = {};
    this.columnsFilters[columnName][operationType] = searchValue;
    this.filter();
  }

  /**
   * clear all associated filters for column name.
   */

  clearFilter(columnName: string): void {
    if (this.columnsFilters[columnName]) {
      delete this.columnsFilters[columnName];
      this.filter();
    }
  }
}
