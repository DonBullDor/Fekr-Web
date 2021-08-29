import { Module } from '../_models/module.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ModuleService {
  module: Module;
  modules: Module[];

  constructor(private http: HttpClient) {
    this.getModules();
    this.getModule('FKR-SV INF');
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  getModule(id: string) {
    this.http.get<Module>('http://localhost:5000/api/Modules/' + id)
      .subscribe(p => this.module = p);
  }

  getModules() {
    this.http.get<Module[]>('http://localhost:5000/api/Modules')
      .subscribe(p => this.modules = p);
  }

  createModule(module: Module) {
    const data = {
      code: module.codeModule,
      designation: module.designation,
      description: module.description,
      nbHeures: module.nbHeures,
      coefficient: module.coef,
      numeroPanier: module.numPanier,
      etat: module.etat
    };
    this.http.post<string>('/api/Modules', data)
      .subscribe(id => {
        module.codeModule = id;
        this.modules.push(module);
      });
  }

  replaceModule(module: Module) {
    const data = {
      code: module.codeModule,
      designation: module.designation,
      description: module.description,
      nbHeures: module.nbHeures,
      coefficient: module.coef,
      numeroPanier: module.numPanier,
      etat: module.etat
    };
    this.http.put('/api/Modules/' + module.codeModule, data)
      .subscribe(() => this.getModules());
  }

  updateModule(id: string, changes: Map<string, any>) {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Modules/' + id, patch)
      .subscribe(() => this.getModules());
  }

  deleteModule(id: string) {
    this.http.delete('/api/Modules/' + id)
      .subscribe(() => this.getModules());
  }
}
