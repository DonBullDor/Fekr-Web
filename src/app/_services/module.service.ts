import { Module } from '../_models/module.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ModuleService {
  module: Module;
  modules: Module[];

  constructor(private http: HttpClient) {
    this.getAllModules();
    this.getModuleById('FKR-SV INF');
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

  getModuleById(id: string): void {
    this.http.get<Module>('http://localhost:5000/api/Modules/' + id)
      .subscribe(p => this.module = p);
  }

  getAllModules(): void {
    this.http.get<Module[]>('http://localhost:5000/api/Modules')
      .subscribe(p => this.modules = p);
  }

  createModule(module: Module): void {
    const data = {
      code: module.codeModule,
      designation: module.designation,
      etat: module.etat
    };
    this.http.post<string>('/api/Modules', data)
      .subscribe(id => {
        module.codeModule = id;
        this.modules.push(module);
      });
  }

  replaceModule(module: Module): void {
    const data = {
      code: module.codeModule,
      designation: module.designation,
      etat: module.etat
    };
    this.http.put('/api/Modules/' + module.codeModule, data)
      .subscribe(() => this.getAllModules());
  }

  updateModule(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Modules/' + id, patch)
      .subscribe(() => this.getAllModules());
  }

  deleteModule(id: string): void {
    this.http.delete('/api/Modules/' + id)
      .subscribe(() => this.getAllModules());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
