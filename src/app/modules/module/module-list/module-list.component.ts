import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Module } from 'src/app/_models/module.model';
import { ModuleService } from 'src/app/_services/module.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  displayedColumns: string[] = ['code', 'designation', 'coef', 'etat', 'detail', 'update'];
  public dataSource = new MatTableDataSource<Module>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: ModuleService, private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllModules();
  }

  public getAllModules = () => {
    this.repo.getData('api/Modules')
      .subscribe(res => {
        this.dataSource.data = res as Module[];
      },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  get modules() {
    return this.repo.getModules;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/module-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
