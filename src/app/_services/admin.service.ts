import { Admin } from '../_models/admin.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  admin: Admin;
  admins: Admin[];

  constructor(private http: HttpClient) {
    this.getAllAdmins();
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

  getAdminById(id: string): void {
    this.http.get<Admin>('http://localhost:5000/api/Admin/' + id)
      .subscribe(p => this.admin = p);
  }

  getAllAdmins(): void {
    this.http.get<Admin[]>('http://localhost:5000/api/Admin')
      .subscribe(p => this.admins = p);
  }

  createAdmin(admin: Admin): void {
    const data = {
      id: admin.idDecid,
      password: admin.pwdDecid
    };
    this.http.post<string>('/api/Admin', data)
      .subscribe(id => {
        admin.idDecid = id;
        this.admins.push(admin);
      });
  }

  replaceAdmin(admin: Admin): void {
    const data = {
      id: admin.idDecid,
      password: admin.pwdDecid
    };
    this.http.put('http://localhost:5000/api/Admin/' + admin.idDecid, data)
      .subscribe(() => this.getAllAdmins());
  }

  updateAdmin(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Admin/' + id, patch)
      .subscribe(() => this.getAllAdmins());
  }

  deleteAdmin(id: string): void {
    this.http.delete('/api/Admin/' + id)
      .subscribe(() => this.getAllAdmins());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
