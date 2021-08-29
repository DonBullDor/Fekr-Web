import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NavigationCancel,
  Router,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ActivatedRoute,
} from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { PlanEtudeService } from 'src/app/_services/plan-etude.service';

@Component({
  selector: 'app-plan-etude-create',
  templateUrl: './plan-etude-create.component.html',
  styleUrls: ['./plan-etude-create.component.css']
})
export class PlanEtudeCreateComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private repo: PlanEtudeService, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService,
    private _formBuilder: FormBuilder, private router: Router,
    public loader: LoadingBarService) {

  }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }
}