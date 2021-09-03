import { Enseignant } from '../_models/enseignant.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnseignantService {
  enseignant: Enseignant;
  enseignants: Enseignant[];

  constructor(private http: HttpClient) {
    this.getAllEnseignants();
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

  getEnseignantById(id: string): void {
    this.http.get<Enseignant>('http://localhost:5000/api/Enseignants/' + id)
      .subscribe(p => this.enseignant = p);
  }

  getAllEnseignants(): void {
    this.http.get<Enseignant[]>('http://localhost:5000/api/Enseignants')
      .subscribe(p => this.enseignants = p);
  }

  createEnseignant(enseignant: Enseignant): void {
    const data = {
      id: enseignant.idEns,
      nom: enseignant.nomEns,
      type: enseignant.typeEns,
      etat: enseignant.etat,
      tel1: enseignant.tel1,
      tel2: enseignant.tel2,
      prenom: enseignant.pnom,
      mail: enseignant.mailEns,
      password: enseignant.pwdEns
    };
    this.http.post<string>('/api/Enseignants', data)
      .subscribe(id => {
        enseignant.idEns = id;
        this.enseignants.push(enseignant);
      });
  }

  replaceEnseignant(enseignant: Enseignant): void {
    const data = {
      id: enseignant.idEns,
      nom: enseignant.nomEns,
      type: enseignant.typeEns,
      etat: enseignant.etat,
      tel1: enseignant.tel1,
      tel2: enseignant.tel2,
      prenom: enseignant.pnom,
      mail: enseignant.mailEns,
      password: enseignant.pwdEns
    };
    this.http.put('/api/Enseignants/' + enseignant.idEns, data)
      .subscribe(() => this.getAllEnseignants());
  }

  updateEnseignant(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Enseignants/' + id, patch)
      .subscribe(() => this.getAllEnseignants());
  }

  deleteEnseignant(id: string): void {
    this.http.delete('/api/Enseignants/' + id)
      .subscribe(() => this.getAllEnseignants());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
