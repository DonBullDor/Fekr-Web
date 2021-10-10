import { Notes } from '../_models/notes.models';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotesServices{
  note: Notes;
  notes: Notes[];

  constructor(private http: HttpClient) {
    this.getAllNotes();
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

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  getNotesById(id: string): void {
    this.http.get<Notes>('http://localhost:5000/api/Notes/' + id)
      .subscribe(p => this.note = p);
  }

  getNotesByFilters(classe: string, idEnseignant: string, annee: string, numSemestre: number){
    return this.http.get<Notes>('http://localhost:5000/api/Notes/GetNotesByClasseAndEnseignantAndAnneDebAndNumSemestre'+
    classe + '/' + idEnseignant + '/' + annee + '/' + numSemestre
    )
  }
  getAllNotes(): void {
    this.http.get<Notes[]>('http://localhost:5000/api/Notes')
      .subscribe(p => this.notes = p);
  }

  createNote(note: Notes): void {
    const data = {
      idEtudiant: note.idEt,
      idEnseignant: note.idEns,
      classe: note.codeCl,
      annee: note.anneeDeb,
      noteOrale: note.orale,
      numeroDeSemestre: note.semestre,
      noteDc1: note.dc1,
      noteDc2: note.dc2,
      noteDevoirDeSynthese: note.ds,
      dateDeSaisieDuNote: note.dateSaisie
    };
    this.http.post<string>('/api/Notes', data)
      .subscribe(id => {
        note.idEt = id;
        this.notes.push(note);
      });
  }

  replaceNote(note: Notes): void {
    const data = {
      idEtudiant: note.idEt,
      idEnseignant: note.idEns,
      classe: note.codeCl,
      annee: note.anneeDeb,
      noteOrale: note.orale,
      numeroDeSemestre: note.semestre,
      noteDc1: note.dc1,
      noteDc2: note.dc2,
      noteDevoirDeSynthese: note.ds,
      dateDeSaisieDuNote: note.dateSaisie
    };
    this.http.put('/api/Notes/' + note.idEt, data)
      .subscribe(() => this.getAllNotes());
  }

  updateNote(id: string, changes: Map<string, any>): void {
    const patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: 'replace', path: key, value }));
    this.http.patch('/api/Notes/' + id, patch)
      .subscribe(() => this.getAllNotes());
  }

  deleteNote(id: string): void {
    this.http.delete('/api/Notes/' + id)
      .subscribe(() => this.getAllNotes());
  }
}
