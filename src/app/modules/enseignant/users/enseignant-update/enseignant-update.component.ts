import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Enseignant} from '../../../../_models/enseignant.model';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanEtudeService} from '../../../../_services';

@Component({
  selector: 'app-enseignant-update',
  templateUrl: './enseignant-update.component.html',
  styleUrls: ['./enseignant-update.component.css']
})
export class EnseignantUpdateComponent implements OnInit {
  public errorMessage = '';
  public enseignant: Enseignant;
  public enseignantForm: FormGroup;

  constructor(private repo: PlanEtudeService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

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

    this.getEnseignantById();
  }

  private getEnseignantById = () => {
    const enseignantId = this.activeRoute.snapshot.params.id;

    const enseignantByIdUrl = `api/Admin/${enseignantId}`;
    this.repo.getData(enseignantByIdUrl)
      .subscribe(res => {
          this.enseignant = res as Enseignant;
          this.enseignantForm.patchValue(this.enseignant);
          $('#id').val(enseignantId);
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public updateEnseignant = (enseignantFormValue) => {
    if (this.enseignantForm.valid) {
      this.executeEnseignantUpdate(enseignantFormValue);
    }
  }

  private executeEnseignantUpdate = (enseignantFormValue) => {
    this.enseignant.idEns = enseignantFormValue.id;
    this.enseignant.nomEns = enseignantFormValue.nom;
    this.enseignant.etat = enseignantFormValue.etat;
    this.enseignant.tel2 = enseignantFormValue.tel2;
    this.enseignant.tel1 = enseignantFormValue.tel1;
    this.enseignant.typeEns = enseignantFormValue.type;
    this.enseignant.pnom = enseignantFormValue.prenom;
    this.enseignant.mailEns = enseignantFormValue.email;
    this.enseignant.pwdEns = enseignantFormValue.password;


    const apiUrl = `api/Enseignants/${this.enseignant.idEns}`;
    this.repo.update(apiUrl, this.enseignant)
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
    return this.enseignantForm.controls[controlName].invalid &&
      this.enseignantForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.enseignantForm.controls[controlName].hasError(errorName);
  }

  public redirectToEnseignantList = () => {
    this.router.navigate(['/admin-list']);
  }

}
