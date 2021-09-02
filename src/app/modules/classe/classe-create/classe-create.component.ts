import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClasseService} from '../../../_services/classe.service';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Classe} from '../../../_models/classe.model';

@Component({
  selector: 'app-classe-create',
  templateUrl: './classe-create.component.html',
  styleUrls: ['./classe-create.component.css']
})
export class ClasseCreateComponent implements OnInit {
  public errorMessage = '';
  public classeForm: FormGroup;

  constructor(private repo: ClasseService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.classeForm = new FormGroup({
      codeClasse: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.classeForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createClasse = (classeFormValue) => {
    if (this.classeForm.valid) {
      this.executeClasseCreation(classeFormValue);
    }
  }

  private executeClasseCreation = (classeFormValue) => {
    const classe: Classe = {
      codeCl: classeFormValue.codeClasse
    };

    const apiUrl = 'api/Classes';
    this.repo.create(apiUrl, classe)
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

  public redirectToClasseList(): void {
    this.router.navigate(['/classe-list']);
  }
}
