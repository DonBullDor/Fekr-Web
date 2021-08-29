import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/_models/admin.model';
import { AdminService } from 'src/app/_services/admin.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import * as $  from "jquery";
@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
  public errorMessage: string = '';
  public adminForm: FormGroup;

  constructor(private repo: AdminService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {

  }


  public redirectToOwnerList() {
    this.router.navigate(['/admin-list']);
  }
}
