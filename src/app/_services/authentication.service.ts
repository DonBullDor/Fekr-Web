import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Etudiant } from '../_models/etudiant.model';
import { Admin } from '../_models/admin.model';
import { Enseignant } from '../_models/enseignant.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Etudiant>;
  public currentUser: Observable<Etudiant>;

  private currentAdminSubject: BehaviorSubject<Admin>;
  public currentAdmin: Observable<Admin>;

  private currentEnseignantSubject: BehaviorSubject<Enseignant>;
  public currentEnseignant: Observable<Enseignant>;

  private currentParentSubject: BehaviorSubject<Etudiant>;
  public currentParent: Observable<Etudiant>;

  // Adds CORS header to the request?
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origins': '*' }) };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Etudiant>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();

    this.currentEnseignantSubject = new BehaviorSubject<Enseignant>(JSON.parse(localStorage.getItem('currentEnseignant')));
    this.currentEnseignant = this.currentEnseignantSubject.asObservable();

    this.currentParentSubject = new BehaviorSubject<Etudiant>(JSON.parse(localStorage.getItem('currentParent')));
    this.currentParent = this.currentParentSubject.asObservable();
  }

  public get currentUserValue(): Etudiant {
    return this.currentUserSubject.value;
  }

  public get currentAdminValue(): Admin {
    return this.currentAdminSubject.value;
  }

  public get currentEnseignantValue(): Enseignant {
    return this.currentEnseignantSubject.value;
  }

  public get currentParentValue(): Etudiant {
    return this.currentParentSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    console.log(username, 'data login', password);
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password }/*, this.httpOptions */)
      .pipe(map(user => {
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('currentRole', 'etudiant');
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  loginAdmin(username: string, password: string): Observable<any> {
    console.log(username, 'data login', password);
    return this.http.post<any>(`${environment.apiUrl}/api/AdminLogin/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentAdmin', JSON.stringify(user));
        localStorage.setItem('currentRole', 'admin');
        this.currentAdminSubject.next(user);
        return user;
      }));
  }

  loginEnseignant(username: string, password: string): Observable<any> {
    console.log(username, 'data login', password);
    return this.http.post<any>(`${environment.apiUrl}/api/enseignants/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentAdmin', JSON.stringify(user));
        localStorage.setItem('currentRole', 'enseignant');
        this.currentAdminSubject.next(user);
        return user;
      }));
  }

  loginParent(username: string, password: string): Observable<any> {
    console.log(username, 'data login', password);
    return this.http.post<any>(`${environment.apiUrl}/parent/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentAdmin', JSON.stringify(user));
        localStorage.setItem('currentRole', 'parent');
        this.currentAdminSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    this.currentUserSubject.next(null);
  }

  logoutAdmin(): void {
    localStorage.removeItem('currentAdmin');
    localStorage.removeItem('currentRole');
    this.currentAdminSubject.next(null);
  }

  logoutEnseignant(): void {
    localStorage.removeItem('currentEnseignant');
    localStorage.removeItem('currentRole');
    this.currentEnseignantSubject.next(null);
  }

  logoutParent(): void {
    localStorage.removeItem('currentParent');
    localStorage.removeItem('currentRole');
    this.currentParentSubject.next(null);
  }
}
