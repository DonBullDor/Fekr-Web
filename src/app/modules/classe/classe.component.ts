import {Component} from '@angular/core';
import {ClasseService} from '../../_services/classe.service';
import {Classe} from '../../_models/classe.model';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent {

  constructor(private repo: ClasseService) {
  }

  get classes(): Classe[] {
    return this.repo.classes;
  }

  get classe(): Classe {
    return this.repo.classe;
  }

}
