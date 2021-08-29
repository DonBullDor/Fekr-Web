import { Component, OnInit } from '@angular/core';
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
export class AdminListComponent implements OnInit {
  displayedColumns: string[] = ['nomDecid', 'idDecid', 'update'];
  public dataSource = new MatTableDataSource<Admin>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: AdminService, private router: Router,
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
        })
  }

  get decids(): Admin[] {
    return this.repo.admins;
  }

  get decid() {
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
    let url: string = `/admin-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }
}
