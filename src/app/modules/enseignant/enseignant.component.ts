import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../../_services/enseignant.service';
import { Enseignant } from '../../_models/enseignant.model';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent {

  constructor(private repo: EnseignantService) { }

  get enseignants(): Enseignant[]{
    return this.repo.enseignants;
  }

  get enseignant(){
    return this.repo.enseignant;
  }

}
