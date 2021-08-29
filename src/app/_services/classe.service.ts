import { Classe } from '../_models/classe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClasseService {
  classe: Classe;
  classes: Classe[];

  constructor(private http: HttpClient) {
    this.getClasse('4 M 2');
    this.getClasses();
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  getClasse(id: string) {
    this.http.get<Classe>('http://localhost:5000/api/Classes/' + id)
      .subscribe(p => this.classe = p);
  }

  getClasses() {
    this.http.get<Classe[]>('http://localhost:5000/api/Classes')
      .subscribe(p => this.classes = p);
  }

  createClasse(classe: Classe) {
    let data = {
      codeClasse: classe.codeCl,
      libelleClasse: classe.libelleCl,
      description: classe.descriptionCl
    };
    this.http.post<string>('/api/Classes', data)
      .subscribe(id => {
        classe.codeCl = id;
        this.classes.push(classe);
      });
  }

  replaceClasse(classe: Classe) {
    let data = {
      codeClasse: classe.codeCl,
      libelleClasse: classe.libelleCl,
      description: classe.descriptionCl
    };
    this.http.put('/api/Classes/' + classe.codeCl, data)
      .subscribe(() => this.getClasses());
  }

  updateClasse(id: string, changes: Map<string, any>) {
    let patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value: value }));
    this.http.patch('/api/Classes/' + id, patch)
      .subscribe(() => this.getClasses());
  }

  deleteClasse(id: string) {
    this.http.delete('/api/Classes/' + id)
      .subscribe(() => this.getClasses());
  }
}
