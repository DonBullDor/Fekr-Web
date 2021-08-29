import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Etudiant } from 'src/app/_models/etudiant.model';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'email', 'update', 'detail'];
  public dataSource = new MatTableDataSource<Etudiant>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: EtudiantService, private errorService: ErrorHandlerService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  public getAllStudents = () => {
    this.repo.getData('api/etudiants')
      .subscribe(res => {
        this.dataSource.data = res as Etudiant[];
      },
      (error) => {
        this.errorService.handleError(error);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  get etudiants() {
    return this.repo.getEtudiants;
  }

  public redirectToDetails = (id: string) => {
    const url = `/etudiant-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
