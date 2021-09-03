import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Module} from '../../../_models/module.model';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleService} from '../../../_services/module.service';

@Component({
  selector: 'app-module-update',
  templateUrl: './module-update.component.html',
  styleUrls: ['./module-update.component.css']
})
export class ModuleUpdateComponent implements OnInit {
  public errorMessage = '';
  public module: Module;
  public moduleForm: FormGroup;

  constructor(private repo: ModuleService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.moduleForm = new FormGroup({
      codeModule: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      etat: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getModuleById();
  }

  private getModuleById = () => {
    const moduleId = this.activeRoute.snapshot.params.id;

    const adminByIdUrl = `api/Admin/${moduleId}`;
    this.repo.getData(adminByIdUrl)
      .subscribe(res => {
          this.module = res as Module;
          this.moduleForm.patchValue(this.module);
          $('#id').val(moduleId);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public updateModule = (moduleFormValue) => {
    if (this.moduleForm.valid) {
      this.executeModuleUpdate(moduleFormValue);
    }
  }

  private executeModuleUpdate = (moduleFormValue) => {
    this.module.codeModule = moduleFormValue.codeModule;
    this.module.etat = moduleFormValue.etat;
    this.module.designation = moduleFormValue.designation;

    const apiUrl = `api/Modules/${this.module.codeModule}`;
    this.repo.update(apiUrl, this.module)
      .subscribe(res => {
          $('#successModal').modal();
        },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public validateControl = (controlName: string) => {
    return this.moduleForm.controls[controlName].invalid &&
      this.moduleForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.moduleForm.controls[controlName].hasError(errorName);
  }

  public redirectToModuleList = () => {
    this.router.navigate(['/module-list']);
  }

}
