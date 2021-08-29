import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Etudiant } from '../_models/etudiant.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({ authorization: JSON.parse(localStorage.getItem('currentUser')).token });
  }

  getAll() {
    console.log();
    return this.http.get<Etudiant[]>(`${environment.apiUrl}/users`, { headers: this.headers });
  }
}
