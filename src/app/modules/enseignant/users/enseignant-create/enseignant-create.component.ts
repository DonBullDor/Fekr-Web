import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EnseignantService} from '../../../../_services/enseignant.service';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Enseignant} from '../../../../_models/enseignant.model';

@Component({
  selector: 'app-enseignant-create',
  templateUrl: './enseignant-create.component.html',
  styleUrls: ['./enseignant-create.component.css']
})
export class EnseignantCreateComponent implements OnInit {
  public errorMessage = '';
  public enseignantForm: FormGroup;

  constructor(private repo: EnseignantService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    this.enseignantForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      prenom: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      etat: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      tel1: new FormControl('', [Validators.required]),
      tel2: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.enseignantForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createEnseignant = (etudiantFormValue) => {
    console.log(etudiantFormValue);
    if (this.enseignantForm.valid) {
      this.executeEnseignantCreation(etudiantFormValue);
    }
  }

  private executeEnseignantCreation = (enseignantFormValue) => {
    const enseignant: Enseignant = {
      idEns: enseignantFormValue.id,
      nomEns : enseignantFormValue.nom,
      pnom : enseignantFormValue.prenom,
      mailEns: enseignantFormValue.email,
      pwdEns: enseignantFormValue.password,
      typeEns: enseignantFormValue.type,
      tel1: enseignantFormValue.tel1,
      tel2: enseignantFormValue.tel2,
      etat: enseignantFormValue.etat
    };

    const apiUrl = 'api/Enseignants';
    this.repo.create(apiUrl, enseignant)
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

  public redirectToEnseignantList(): void {
    this.router.navigate(['/enseignant-list']);
  }
}
