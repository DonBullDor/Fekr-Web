import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module } from 'src/app/_models/module.model';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { ModuleService } from 'src/app/_services/module.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  public module: Module;

  constructor(private repo: ModuleService, private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getModuleDetails();
  }

  private getModuleDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/Modules/${id}`;

    this.repo.getData(apiUrl)
    .subscribe(res => {
      this.module = res as Module;
    },
    (error) => {
      this.errorHandler.handleError(error);
    });
  }

}
