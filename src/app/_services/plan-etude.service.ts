import { Module } from '../_models/module.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';

@Injectable()
export class PlanEtudeService {
  constructor(private http: HttpClient) {}

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
