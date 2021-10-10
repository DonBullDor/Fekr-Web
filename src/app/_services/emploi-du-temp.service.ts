import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {EmploiDuTemp} from '../_models/emploi-du-temp.model';

@Injectable()
export class EmploiDuTempService {
  emploi: EmploiDuTemp;
  emplois: EmploiDuTemp[];

  constructor(private http: HttpClient) {
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

  getEmploiDuTempById(id: string): void {
    this.http.get<EmploiDuTemp>('http://localhost:5000/api/EmploiDuTemp/' + id)
      .subscribe(p => this.emploi = p);
  }

  getAllEmploiDuTemps(): void {
    this.http.get<EmploiDuTemp[]>('http://localhost:5000/api/EmploiDuTemp')
      .subscribe(p => this.emplois = p);
  }

  getAllEmploiDuTemp2(): Observable<EmploiDuTemp[]> {
    return this.http.get<EmploiDuTemp[]>('http://localhost:5000/api/EmploiDuTemp');
  }

  // getGeneratedEmploiDuTemp(): Observable<EmploiDuTemp[]> {
  //   return this.http.get<EmploiDuTemp[]>('http://localhost:5000/api/EmploiDuTemp');
  // }
  createEmploiDuTemp(emploiDuTemp: EmploiDuTemp): void {
    const data = {
      codeClasse: emploiDuTemp.codeCl,
      annee: emploiDuTemp.anneeDeb,
      semestre: emploiDuTemp.semestre,
      codeModule: emploiDuTemp.codeModule,
      numSeance: emploiDuTemp.numSeance,
      jour: emploiDuTemp.jour,
      typeSeance: emploiDuTemp.typeSeance,
      dateSaisie: emploiDuTemp.dateSaisie
    };
    this.http.post<string>('/api/EmploiDuTemp', data)
      .subscribe(id => {
        emploiDuTemp.codeCl = id;
        this.emplois.push(emploiDuTemp);
      });
  }

  replaceEmploiDuTemp(emploiDuTemp: EmploiDuTemp): void {
    const data = {
      codeClasse: emploiDuTemp.codeCl,
      annee: emploiDuTemp.anneeDeb,
      semestre: emploiDuTemp.semestre,
      codeModule: emploiDuTemp.codeModule,
      numSeance: emploiDuTemp.numSeance,
      jour: emploiDuTemp.jour,
      typeSeance: emploiDuTemp.typeSeance,
      dateSaisie: emploiDuTemp.dateSaisie
    };
    this.http.put('/api/EmploiDuTemp/' + emploiDuTemp.codeCl, data)
      .subscribe(() => this.getAllEmploiDuTemps());
  }

  updateEmploiDuTemp(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({op: 'replace', path: key, value}));
    this.http.patch('/api/EmploiDuTemp/' + id, patch)
      .subscribe(() => this.getAllEmploiDuTemps());
  }

  deleteEmploiDuTemp(id: string): void {
    this.http.delete('/api/EmploiDuTemp/' + id)
      .subscribe(() => this.getAllEmploiDuTemps());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
