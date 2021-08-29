import { Admin } from '../_models/admin.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  admin: Admin;
  admins: Admin[];

  constructor(private http: HttpClient) {
    this.getDecids();
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

  getDecid(id: string) {
    this.http.get<Admin>('http://localhost:5000/api/Admin/' + id)
      .subscribe(p => this.admin = p);
  }

  getDecids() {
    this.http.get<Admin[]>('http://localhost:5000/api/Admin')
      .subscribe(p => this.admins = p);
  }

  createDecid(admin: Admin) {
    const data = {
      id: admin.idDecid,
      nom: admin.nomDecid,
      titre: admin.titreDecid,
      etat: admin.etatDecid,
      password: admin.pwdDecid
    };
    this.http.post<string>('/api/Admin', data)
      .subscribe(id => {
        admin.idDecid = id;
        this.admins.push(admin);
      });
  }

  replaceDecid(admin: Admin) {
    const data = {
      id: admin.idDecid,
      nom: admin.nomDecid,
      titre: admin.titreDecid,
      etat: admin.etatDecid,
      password: admin.pwdDecid
    };
    this.http.put('http://localhost:5000/api/Admin/' + admin.idDecid, data)
      .subscribe(() => this.getDecids());
  }

  updateDecid(id: string, changes: Map<string, any>) {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Admin/' + id, patch)
      .subscribe(() => this.getDecids());
  }

  deleteDecid(id: string) {
    this.http.delete('/api/Admin/' + id)
      .subscribe(() => this.getDecids());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
