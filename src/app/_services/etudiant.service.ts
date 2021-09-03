import { Etudiant } from '../_models/etudiant.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class EtudiantService {
  etudiant: Etudiant;
  etudiants: Etudiant[];

  constructor(private http: HttpClient) {
    this.getEtudiant('1511FT-056');
    this.getAllEtudiants();
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }

  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }

  getEtudiant(id: string): void {
    this.http.get<Etudiant>('http://localhost:5000/api/Etudiants/' + id)
      .subscribe(p => this.etudiant = p);
  }

  getAllEtudiants(): void {
    this.http.get<Etudiant[]>('http://localhost:5000/api/Etudiants/')
      .subscribe(p => this.etudiants = p);
  }

  createEtudiant(etudiant: Etudiant): void {
    const data = {
      id: etudiant.idEt,
      nom: etudiant.nomEt,
      prenom: etudiant.pnomEt,
      mail: etudiant.eMailEt,
      anneeEntree: etudiant.anneeEntreeEspEt,
      classeCourant: etudiant.classeCouranteEt,
      mailParent: etudiant.eMailParent,
      login: etudiant.login,
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

  replaceEtudiant(etudiant: Etudiant): void {
    const data = {
      id: etudiant.idEt,
      nom: etudiant.nomEt,
      prenom: etudiant.pnomEt,
      mail: etudiant.eMailEt,
      anneeEntree: etudiant.anneeEntreeEspEt,
      classeCourant: etudiant.classeCouranteEt,
      mailParent: etudiant.eMailParent,
      login: etudiant.login,
      password: etudiant.password,
      mailPere: etudiant.emailPereEt,
      mailMere: etudiant.emailMereEt,
      nomMere: etudiant.nomMereEt,
      nomPere: etudiant.nomMereEt,
      mailEsprit: etudiant.adresseMailEsp,
      passwordParent: etudiant.pwdParent
    };
    this.http.put('/api/Etudiants/' + etudiant.idEt, data)
      .subscribe(() => this.getAllEtudiants());
  }

  updateEtudiant(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Etudiants/' + id, patch)
      .subscribe(() => this.getAllEtudiants());
  }

  deleteEtudiant(id: string): void {
    this.http.delete('/api/Etudiants/' + id)
      .subscribe(() => this.getAllEtudiants());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
