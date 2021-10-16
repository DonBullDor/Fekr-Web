import {PlanEtude} from '../_models/plan-etude.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Societe} from '../_models/societe.model';
import {Observable} from 'rxjs';

@Injectable()
export class PlanEtudeService {
  planEtude: PlanEtude;
  planEtudes: PlanEtude[];
  annee: Societe;

  constructor(private http: HttpClient) {
    // this.getAllPlanEtudes();
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  public getDataByCriteria = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
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

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  getPlanEtudeById(id: string): void {
    this.http.get<PlanEtude>('http://localhost:5000/api/PlanEtude/' + id)
      .subscribe(p => this.planEtude = p);
  }

  generatePlan(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/PlanEtude/GeneratePlanEtude');
  }

  getAllPlanEtudes(): void {
    this.http.get<PlanEtude[]>('http://localhost:5000/api/PlanEtude')
      .subscribe(p => this.planEtudes = p);
  }

  getAnneeDebut(annee: string): void {
    this.http.get<Societe>('http://localhost:5000/api/Societe/' + annee)
      .subscribe(p => this.annee = p);
  }

  getAnnees(): Observable<Societe[]> {
    return this.http.get<Societe[]>('http://localhost:5000/api/Societes/');
  }

  createPlanEtude(planEtude: PlanEtude): void {
    const data = {
      codeModule: planEtude.codeModule,
      codeClasse: planEtude.codeCl,
      annee: planEtude.anneeDeb,
      idEnseignant: planEtude.idEns
    };
    this.http.post<string>('/api/PlanEtude', data)
      .subscribe(id => {
        planEtude.codeCl = id;
        this.planEtudes.push(planEtude);
      });
  }

  createAllPlanEtude(url: string, planEtude: PlanEtude[]): Observable<boolean> {
    return this.http.post<boolean>(`http://localhost:5000/${url}`, planEtude);
  }

  replacePlanEtude(planEtude: PlanEtude): void {
    const data = {
      codeModule: planEtude.codeModule,
      codeClasse: planEtude.codeCl,
      annee: planEtude.anneeDeb,
      idEnseignant: planEtude.idEns
    };
    this.http.put('/api/PlanEtude/' + planEtude.codeCl, data)
      .subscribe(() => this.getAllPlanEtudes());
  }

  updatePlanEtude(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({op: 'replace', path: key, value}));
    this.http.patch('/api/PlanEtude/' + id, patch)
      .subscribe(() => this.getAllPlanEtudes());
  }

  deletePlanEtude(id: string): void {
    this.http.delete('/api/PlanEtude/' + id)
      .subscribe(() => this.getAllPlanEtudes());
  }
}
