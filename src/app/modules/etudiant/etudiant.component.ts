import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../_services/etudiant.service';
import { Etudiant } from '../../_models/etudiant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent{

  constructor(private repo: EtudiantService) {
    //this.getEtudiant("1511FT-056");
   }

  get etudiant(){
    return this.repo.etudiant;
  }

  get etudiants(): Etudiant[] {
    return this.repo.etudiants;
  }

  navigationButton(id: string){
    this.repo.getEtudiant(id);
    //this.router.navigateByUrl();
  }
}
