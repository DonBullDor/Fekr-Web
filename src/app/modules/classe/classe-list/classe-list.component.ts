import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Classe } from 'src/app/_models/classe.model';
import { ClasseService } from 'src/app/_services/classe.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.css']
})
export class ClasseListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'detail', 'update'];
  public dataSource = new MatTableDataSource<Classe>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: ClasseService, private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllClasses();
  }

  public getAllClasses = () => {
    this.repo.getData('api/Classes')
    .subscribe(res => {
      this.dataSource.data = res as Classe[];
    }, (error) => {
      this.errorService.handleError(error);
    })
  }

  get classes() {
    return this.repo.classes;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/classe-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
