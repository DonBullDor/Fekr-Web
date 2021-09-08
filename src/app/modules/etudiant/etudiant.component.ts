import {Component} from '@angular/core';
import {EtudiantService} from '../../_services/etudiant.service';
import {Etudiant} from '../../_models/etudiant.model';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent {

  constructor(private repo: EtudiantService) {
    // this.getEtudiant("1511FT-056");
  }

  get etudiant(): Etudiant {
    return this.repo.etudiant;
  }

  get etudiants(): Etudiant[] {
    return this.repo.etudiants;
  }
}
