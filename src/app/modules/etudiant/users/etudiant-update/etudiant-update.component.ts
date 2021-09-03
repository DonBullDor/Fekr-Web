import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Etudiant} from '../../../../_models/etudiant.model';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EtudiantService} from '../../../../_services/etudiant.service';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrls: ['./etudiant-update.component.css']
})
export class EtudiantUpdateComponent implements OnInit {
  public errorMessage = '';
  public etudiant: Etudiant;
  public etudiantForm: FormGroup;

  constructor(private repo: EtudiantService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
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

    this.getEtudiantById();
  }

  private getEtudiantById = () => {
    const etudiantId = this.activeRoute.snapshot.params.id;

    const etudiantByIdUrl = `api/Etudiants/${etudiantId}`;
    this.repo.getData(etudiantByIdUrl)
      .subscribe(res => {
          this.etudiant = res as Etudiant;
          this.etudiantForm.patchValue(this.etudiant);
          $('#id').val(etudiantId);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public updateEtudiant = (etudiantFormValue) => {
    if (this.etudiantForm.valid) {
      this.executeEtudiantUpdate(etudiantFormValue);
    }
  }

  private executeEtudiantUpdate = (etudiantFormValue) => {
    this.etudiant.idEt = etudiantFormValue.id;
    this.etudiant.nomEt = etudiantFormValue.nom;
    this.etudiant.pnomEt = etudiantFormValue.prenom;
    this.etudiant.eMailEt = etudiantFormValue.email;
    this.etudiant.anneeEntreeEspEt = etudiantFormValue.anneeEntree;
    this.etudiant.classeCouranteEt = etudiantFormValue.classeCourant;
    this.etudiant.eMailParent = etudiantFormValue.emailParent;
    this.etudiant.login = etudiantFormValue.login;
    this.etudiant.password = etudiantFormValue.password;
    this.etudiant.emailPereEt = etudiantFormValue.emailPere;
    this.etudiant.emailMereEt = etudiantFormValue.emailMere;
    this.etudiant.nomMereEt = etudiantFormValue.nomMere;
    this.etudiant.nomPereEt = etudiantFormValue.nomPere;
    this.etudiant.adresseMailEsp = etudiantFormValue.mailEsprit;
    this.etudiant.pwdEt = etudiantFormValue.passwordEtudiant;
    this.etudiant.pwdParent = etudiantFormValue.passwordParent;

    const apiUrl = `api/Admin/${this.etudiant.idEt}`;
    this.repo.update(apiUrl, this.etudiant)
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
    return this.etudiantForm.controls[controlName].invalid &&
      this.etudiantForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.etudiantForm.controls[controlName].hasError(errorName);
  }

  public redirectToEtudiantList = () => {
    this.router.navigate(['/etudiant-list']);
  }
}
