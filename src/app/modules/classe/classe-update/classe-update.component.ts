import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Classe} from '../../../_models/classe.model';
import {ErrorHandlerService} from '../../../_services/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClasseService} from '../../../_services/classe.service';

@Component({
  selector: 'app-classe-update',
  templateUrl: './classe-update.component.html',
  styleUrls: ['./classe-update.component.css']
})
export class ClasseUpdateComponent implements OnInit {
  public errorMessage = '';
  public classe: Classe;
  public classeForm: FormGroup;

  constructor(private repo: ClasseService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.classeForm = new FormGroup({
      codeClasse: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.getClasseById();
  }

  private getClasseById = () => {
    const classeId = this.activeRoute.snapshot.params.id;

    const classeByIdUrl = `api/Classes/${classeId}`;
    this.repo.getData(classeByIdUrl)
      .subscribe(res => {
          this.classe = res as Classe;
          this.classeForm.patchValue(this.classe);
          $('#id').val(classeId);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public updateClasse = (classeFormValue) => {
    if (this.classeForm.valid) {
      this.executeClasseUpdate(classeFormValue);
    }
  }

  private executeClasseUpdate = (classeFormValue) => {
    this.classe.codeCl = classeFormValue.codeClasse;
    const apiUrl = `api/Classe/${this.classe.codeCl}`;
    this.repo.update(apiUrl, this.classe)
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
    return this.classeForm.controls[controlName].invalid &&
      this.classeForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.classeForm.controls[controlName].hasError(errorName);
  }

  public redirectToClasseList = () => {
    this.router.navigate(['/classe-list']);
  }

}
