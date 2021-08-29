import { Etudiant } from '../_models/etudiant.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class EtudiantService {
  etudiant: Etudiant;
  etudiants: Etudiant[];

  constructor(private http: HttpClient) {
    this.getEtudiant('1511FT-056');
    this.getEtudiants();
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  getEtudiant(id: string) {
    this.http.get<Etudiant>('http://localhost:5000/api/Etudiants/' + id)
      .subscribe(p => this.etudiant = p);
  }

  getEtudiants() {
    this.http.get<Etudiant[]>('http://localhost:5000/api/Etudiants/')
      .subscribe(p => this.etudiants = p);
  }

  createEtudiant(etudiant: Etudiant) {
    const data = {
      id: etudiant.idEt,
      nom: etudiant.nomEt,
      prenom: etudiant.pnomEt,
      mail: etudiant.eMailEt,
      anneeEntree: etudiant.anneeEntreeEspEt,
      classeCourant: etudiant.classeCouranteEt,
      mailParent: etudiant.eMailParent,
      login: etudiant.loin,
      password: etudiant.password,
      mailPere: etudiant.emailPereEt,
      mailMere: etudiant.emailMereEt,
      nomMere: etudiant.nomMereEt,
      nomPere: etudiant.nomMereEt,
      mailEsprit: etudiant.adresseMailEsp,
      passwordParent: etudiant.pwdParent
    };
    this.http.post<string>('/api/Etudiants', data)
      .subscribe(id => {
        etudiant.idEt = id;
        this.etudiants.push(etudiant);
      });
  }

  replaceEtudiant(etudiant: Etudiant) {
    const data = {
      id: etudiant.idEt,
      nom: etudiant.nomEt,
      prenom: etudiant.pnomEt,
      mail: etudiant.eMailEt,
      anneeEntree: etudiant.anneeEntreeEspEt,
      classeCourant: etudiant.classeCouranteEt,
      mailParent: etudiant.eMailParent,
      login: etudiant.loin,
      password: etudiant.password,
      mailPere: etudiant.emailPereEt,
      mailMere: etudiant.emailMereEt,
      nomMere: etudiant.nomMereEt,
      nomPere: etudiant.nomMereEt,
      mailEsprit: etudiant.adresseMailEsp,
      passwordParent: etudiant.pwdParent
    };
    this.http.put('/api/Etudiants/' + etudiant.idEt, data)
      .subscribe(() => this.getEtudiants());
  }

  updateEtudiant(id: string, changes: Map<string, any>) {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Etudiants/' + id, patch)
      .subscribe(() => this.getEtudiants());
  }

  deleteEtudiant(id: string) {
    this.http.delete('/api/Etudiants/' + id)
      .subscribe(() => this.getEtudiants());
  }
}
