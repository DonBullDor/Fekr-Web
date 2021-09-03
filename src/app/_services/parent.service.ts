import { Etudiant } from '../_models/etudiant.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }

  getParentById(id: string): void {
    this.http.get<Etudiant>('http://localhost:5000/api/Etudiants/' + id)
      .subscribe(p => this.etudiant = p);
  }

  getEtudiants(): void {
    this.http.get<Etudiant[]>('http://localhost:5000/api/Etudiants/')
      .subscribe(p => this.etudiants = p);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
