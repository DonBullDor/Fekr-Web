import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Etudiant } from 'src/app/_models/etudiant.model';
import { UserService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
    users: Etudiant[];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
