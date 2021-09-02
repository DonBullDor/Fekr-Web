import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { Enseignant } from 'src/app/_models/enseignant.model';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-enseignant-list',
  templateUrl: './enseignant-list.component.html',
  styleUrls: ['./enseignant-list.component.css']
})
export class EnseignantListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'email', 'update', 'detail'];
  public dataSource = new MatTableDataSource<Enseignant>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: EnseignantService,
              private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllEnseignant();
  }

  public getAllEnseignant = () => {
    this.repo.getData('api/enseignants')
      .subscribe(res => {
        this.dataSource.data = res as Enseignant[];
      }, (error) => {
        this.errorService.handleError(error);
      });
  }

  get enseignants(): Enseignant[] {
    return this.repo.enseignants;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/enseignant-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
