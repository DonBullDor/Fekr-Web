import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../_services/error-handler.service';
import { NotesServices } from '../../../_services/notes.services';
import { Notes } from '../../../_models/notes.models';

@Component({
  selector: 'app-saisie-notes',
  templateUrl: './saisie-notes.component.html',
  styleUrls: ['./saisie-notes.component.css']
})
export class SaisieNotesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idEtudiant', 'idEnseignant', 'codeClasse', 'annee', 'codeModule', 'orale', 'semestre',
    'dc1', 'dc2', 'ds', 'date', 'detail', 'update'];

  public dataSource = new MatTableDataSource<Notes>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: NotesServices,
              private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllNotes();
  }

  public getAllNotes = () => {
    this.repo.getData('api/Notes')
      .subscribe(res => {
          this.dataSource.data = res as Notes[];
        },
        (error) => {
          this.errorService.handleError(error);
        });
  }

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
