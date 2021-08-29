import { Enseignant } from '../_models/enseignant.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnseignantService {
  enseignant: Enseignant;
  enseignants: Enseignant[];

  constructor(private http: HttpClient) {
    this.getEnseignants();
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  getEnseignant(id: string) {
    this.http.get<Enseignant>('http://localhost:5000/api/Enseignants/' + id)
      .subscribe(p => this.enseignant = p);
  }

  getEnseignants() {
    this.http.get<Enseignant[]>('http://localhost:5000/api/Enseignants')
      .subscribe(p => this.enseignants = p);
  }

  createEnseignant(enseignant: Enseignant) {
    const data = {
      id: enseignant.idEns,
      nom: enseignant.nomEns,
      mail: enseignant.mailEns,
      password: enseignant.pwdEns
    };
    this.http.post<string>('/api/Enseignants', data)
      .subscribe(id => {
        enseignant.idEns = id;
        this.enseignants.push(enseignant);
      });
  }

  replaceEnseignant(enseignant: Enseignant) {
    const data = {
      id: enseignant.idEns,
      nom: enseignant.nomEns,
      mail: enseignant.mailEns,
      password: enseignant.pwdEns
    };
    this.http.put('/api/Enseignants/' + enseignant.idEns, data)
      .subscribe(() => this.getEnseignants());
  }

  updateEnseignant(id: string, changes: Map<string, any>) {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Enseignants/' + id, patch)
      .subscribe(() => this.getEnseignants());
  }

  deleteEnseignant(id: string) {
    this.http.delete('/api/Enseignants/' + id)
      .subscribe(() => this.getEnseignants());
  }
}
