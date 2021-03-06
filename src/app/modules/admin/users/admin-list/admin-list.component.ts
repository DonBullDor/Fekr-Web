import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../../_services/admin.service';
import { Admin } from '../../../../_models/admin.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nomDecid', 'idDecid', 'update'];
  public dataSource = new MatTableDataSource<Admin>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: AdminService,
              private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  public getAllAdmins = () => {
    this.repo.getData('api/Admin')
      .subscribe(res => {
        this.dataSource.data = res as Admin[];
      },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  get admins(): Admin[] {
    return this.repo.admins;
  }

  get admin(): Admin {
    return this.repo.admin;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/admin-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdatePage = (id) => {
    const updateUrl = `/admin-update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDelete = (id: string) => {

  }
}
