import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/_models/admin.model';
import { AdminService } from 'src/app/_services/admin.service';
import { ErrorHandlerService } from '../../../../_services/error-handler.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  public admin: Admin;

  constructor(private repo: AdminService,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAdminDetails();
  }

  private getAdminDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/Admin/${id}`;

    this.repo.getData(apiUrl)
    .subscribe(res => {
      this.admin = res as Admin;
    },
    (error) => {
      this.errorHandler.handleError(error);
    });
  }
}
