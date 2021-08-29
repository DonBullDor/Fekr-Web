import { Etudiant } from '../_models/etudiant.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ParentService {
  etudiant: Etudiant;
  etudiants: Etudiant[];
  constructor(private http: HttpClient) {

  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  getParent(id: string) {
    this.http.get<Etudiant>('http://localhost:5000/api/Etudiants/' + id)
      .subscribe(p => this.etudiant = p);
  }

  getEtudiants() {
    this.http.get<Etudiant[]>('http://localhost:5000/api/Etudiants/')
      .subscribe(p => this.etudiants = p);
  }
}
