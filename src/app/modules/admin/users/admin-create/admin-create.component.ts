import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AdminService} from 'src/app/_services/admin.service';
import {ErrorHandlerService} from 'src/app/_services/error-handler.service';
import {Admin} from '../../../../_models/admin.model';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  public errorMessage = '';
  public adminForm: FormGroup;

  constructor(private repo: AdminService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.adminForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createAdmin = (adminFormValue) => {
    if (this.adminForm.valid) {
      this.executeAdminCreation(adminFormValue);
    }
  }

  private executeAdminCreation = (adminFormValue) => {
    const admin: Admin = {
      idDecid: adminFormValue.id,
      pwdDecid: adminFormValue.password
    };

    const apiUrl = 'api/Admin';
    this.repo.create(apiUrl, admin)
      .subscribe(res => {
          // this is temporary, until we create our dialogs
          this.location.back();
        },
        (error => {
          // temporary as well
          this.location.back();
        })
      );
  }

  public redirectToAdminList(): void {
    this.router.navigate(['/admin-list']);
  }
}
