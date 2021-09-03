import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EtudiantService} from '../../../../_services/etudiant.service';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Etudiant} from '../../../../_models/etudiant.model';

@Component({
  selector: 'app-etudiant-create',
  templateUrl: './etudiant-create.component.html',
  styleUrls: ['./etudiant-create.component.css']
})
export class EtudiantCreateComponent implements OnInit {
  public errorMessage = '';
  public etudiantForm: FormGroup;

  constructor(private repo: EtudiantService,
              private errorHandlerService: ErrorHandlerService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.etudiantForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      prenom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      anneeEntree: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      classeCourant: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailParent: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      login: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailPere: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailMere: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      nomPere: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      prenomPere: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      eMailEsprit: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      passwordEtudiant: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      passwordParent: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.etudiantForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createEtudiant = (etudiantFormValue) => {
    console.log(etudiantFormValue);
    if (this.etudiantForm.valid) {
      this.executeEtudiantCreation(etudiantFormValue);
    }
  }

  private executeEtudiantCreation = (etudiantFormValue) => {
    const etudiant: Etudiant = {
      idEt: etudiantFormValue.id,
      nomEt: etudiantFormValue.nom,
      pnomEt: etudiantFormValue.prenom,
      eMailEt: etudiantFormValue.email,
      anneeEntreeEspEt: etudiantFormValue.anneeEntree,
      classeCouranteEt: etudiantFormValue.classeCourant,
      eMailParent: etudiantFormValue.eMailParent,
      login: etudiantFormValue.login,
      password: etudiantFormValue.password,
      emailPereEt: etudiantFormValue.emailPere,
      emailMereEt: etudiantFormValue.emailMere,
      nomPereEt: etudiantFormValue.nomPere,
      nomMereEt: etudiantFormValue.nomMere,
      adresseMailEsp: etudiantFormValue.adresseMailEsp,
      pwdEt: etudiantFormValue.password,
      pwdParent: etudiantFormValue.passwordParent
    };

    const apiUrl = 'api/Etudiants';
    this.repo.create(apiUrl, etudiant)
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

  public redirectToEtudiantList(): void {
    this.router.navigate(['/etudiant-list']);
  }
}
