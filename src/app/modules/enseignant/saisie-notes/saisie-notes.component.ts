import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../_services/error-handler.service';
import { NotesServices } from '../../../_services/notes.services';
import { Notes } from '../../../_models/notes.models';
import { ClasseService } from 'src/app/_services/classe.service';
import { PlanEtudeService } from 'src/app/_services';
import { Classe } from 'src/app/_models/classe.model';
import { Societe } from 'src/app/_models/societe.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface IFilters
{
  classe: string;
  numSemestre: number;
  idEnseignant: string;
  annee: string;
}

@Component({
  selector: 'app-saisie-notes',
  templateUrl: './saisie-notes.component.html',
  styleUrls: ['./saisie-notes.component.css']
})
export class SaisieNotesComponent implements OnInit, AfterViewInit {
  public classes: Classe[] = [];
  public annees: Societe[] = [];
  public filtersForm: FormGroup;
  displayedColumns: string[] = ['idEtudiant', 'idEnseignant', 'codeClasse', 'annee', 'codeModule', 'orale', 'semestre',
    'dc1', 'dc2', 'ds', 'date', 'detail', 'update'];

  public dataSource = new MatTableDataSource<Notes>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: NotesServices,
              private classeRepo: ClasseService,
              private anneeRepo: PlanEtudeService,
              private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.classeRepo.getAllClassesTest().subscribe((classes) => {
      this.classes == classes;
    });
    this.anneeRepo.getAnnees().subscribe((annees) => {
      this.annees = annees;
    });
    this.filtersForm = new FormGroup ({
      codeClasse: new FormControl('', Validators.required),
      annee: new FormControl('', Validators.required),
      numSemestre: new FormControl('', Validators.required)
    });
    // this.getAllNotes();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.filtersForm.controls[controlName].hasError(errorName);
  }


  public getNotesFromFilters = (notesFormValue) => {
    console.log(notesFormValue);
    // if (this.planEtudeForm.valid) {
    this.executeGetNotesFromFilters(notesFormValue);
    // }
  }

  private executeGetNotesFromFilters = (notesFormValue) => {
    const filter: IFilters = {
      classe: notesFormValue.codeClasse,
      annee: notesFormValue.annee,
      idEnseignant: '',
      numSemestre : notesFormValue.numSemestre
    };

    this.repo.getNotesByFilters(filter.classe, filter.idEnseignant, filter.annee, filter.numSemestre)
      .subscribe(res => {
          // this is temporary, until we create our dialogs
          // this.location.back();
          this.dataSource.data = res as Notes[];
        },
        (error => {
          // temporary as well
          // this.location.back();
        })
      );
  }

  // public getAllNotes = () => {
  //   this.repo.getData('api/Notes')
  //     .subscribe(res => {
  //         this.dataSource.data = res as Notes[];
  //       },
  //       (error) => {
  //         this.errorService.handleError(error);
  //       });
  // }

  get notes(): Notes[] {
    return this.repo.notes;
  }

  get note(): Notes {
    return this.repo.note;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/notes-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
