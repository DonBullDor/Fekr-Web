import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../_services/module.service';
import { Module } from '../../_models/module.model'
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  constructor(private repo: ModuleService) { }

  ngOnInit(): void {
  }

  get modules(): Module[] {
    return this.repo.modules;
  }

  get module() {
    return this.repo.module;
  }
}
