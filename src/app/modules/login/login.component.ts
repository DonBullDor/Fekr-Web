import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';

interface Users {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  selectedRole = 'etudiant';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  usersType: Users[] = [
    { value: 'etudiant', viewValue: 'Etudiant' },
    { value: 'admin', viewValue: 'Admin' },
    { value: 'enseignant', viewValue: 'Enseignant' },
    { value: 'parent', viewValue: 'Parent' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    console.log('selected value before submit : ', this.selectedRole);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  onSubmit() {
    console.log('selected value after submit : ', this.selectedRole);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // if (this.selectedValue == 'etudiant') {
    //   this.authenticateEtudiant();
    // }

    switch (this.selectedRole) {
      case 'etudiant':
        {
          this.authenticateEtudiant();
          break;
        }
      case 'enseignant':
        {
          this.authenticateEnseignant();
          break;
        }
      case 'admin':
        {
          this.authenticateAdmin();
          break;
        }
      case 'parent':
        {
          this.authenticateParent();
          break;
        }
    }
  }

  authenticateEtudiant() {
    console.log('redirect to etudiant space');
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  authenticateEnseignant() {
    console.log('redirect to enseignant space');
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  authenticateAdmin() {
    console.log('redirect to admin space');
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  authenticateParent() {
    console.log('redirect to parent space');
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
