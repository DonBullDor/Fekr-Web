import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Etudiant } from '../_models/etudiant.model';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({ authorization: JSON.parse(localStorage.getItem('currentUser')).token });
  }

  getAll(): Observable<Etudiant[]> {
    console.log();
    return this.http.get<Etudiant[]>(`${environment.apiUrl}/users`, { headers: this.headers });
  }
}
