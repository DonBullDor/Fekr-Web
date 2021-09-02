import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModuleService} from '../../../_services/module.service';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Module} from '../../../_models/module.model';

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.css']
})
export class ModuleCreateComponent implements OnInit {
  public errorMessage = '';
  public moduleForm: FormGroup;

  constructor(private repo: ModuleService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.moduleForm = new FormGroup({
      codeModule: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      etat: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.moduleForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createModule = (etudiantFormValue) => {
    if (this.moduleForm.valid) {
      this.executeModuleCreation(etudiantFormValue);
    }
  }

  private executeModuleCreation = (moduleFormValue) => {
    const module: Module = {
      codeModule: moduleFormValue.codeModule,
      designation : moduleFormValue.designation,
      etat : moduleFormValue.etat,
    };

    const apiUrl = 'api/Modules';
    this.repo.create(apiUrl, module)
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

  public redirectToModuleList(): void {
    this.router.navigate(['/module-list']);
  }

}
