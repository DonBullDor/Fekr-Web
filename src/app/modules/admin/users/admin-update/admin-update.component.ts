import {Component, OnInit} from '@angular/core';
import {Admin} from '../../../../_models/admin.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../../_services/admin.service';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {

  public errorMessage = '';
  public admin: Admin;
  public adminForm: FormGroup;

  constructor(private repo: AdminService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getAdminById();
  }

  private getAdminById = () => {
    const adminId = this.activeRoute.snapshot.params.id;

    const adminByIdUrl = `api/Admin/${adminId}`;
    this.repo.getData(adminByIdUrl)
      .subscribe(res => {
          this.admin = res as Admin;
          this.adminForm.patchValue(this.admin);
          $('#id').val(adminId);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public updateAdmin = (adminFormValue) => {
    console.log(adminFormValue);
    if (this.adminForm.valid) {
      this.executeAdminUpdate(adminFormValue);
    }
  }

  private executeAdminUpdate = (adminFormValue) => {
    this.admin.idDecid = adminFormValue.id;
    this.admin.pwdDecid = adminFormValue.password;
    const apiUrl = `api/Admin/${this.admin.idDecid}`;
    this.repo.update(apiUrl, this.admin)
      .subscribe(res => {
          ($('#successModal') as any).modal();
        },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public validateControl = (controlName: string) => {
    return this.adminForm.controls[controlName].invalid && this.adminForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string)  => {
    return this.adminForm.controls[controlName].hasError(errorName);
  }

  public redirectToAdminList = () => {
    this.router.navigate(['/admin-list']);
  }
}
