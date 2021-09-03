import { Classe } from '../_models/classe.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClasseService {
  classe: Classe;
  classes: Classe[];

  constructor(private http: HttpClient) {
    this.getClasseById('4 M 2');
    this.getAllClasses();
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

  getClasseById(id: string): void {
    this.http.get<Classe>('http://localhost:5000/api/Classes/' + id)
      .subscribe(p => this.classe = p);
  }

  getAllClasses(): void {
    this.http.get<Classe[]>('http://localhost:5000/api/Classes')
      .subscribe(p => this.classes = p);
  }

  createClasse(classe: Classe): void {
    const data = {
      codeClasse: classe.codeCl
    };
    this.http.post<string>('/api/Classes', data)
      .subscribe(id => {
        classe.codeCl = id;
        this.classes.push(classe);
      });
  }

  replaceClasse(classe: Classe): void {
    const data = {
      codeClasse: classe.codeCl
    };
    this.http.put('/api/Classes/' + classe.codeCl, data)
      .subscribe(() => this.getAllClasses());
  }

  updateClasse(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Classes/' + id, patch)
      .subscribe(() => this.getAllClasses());
  }

  deleteClasse(id: string): void {
    this.http.delete('/api/Classes/' + id)
      .subscribe(() => this.getAllClasses());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
