import { NgModule } from '@angular/core';
import { EtudiantService } from '../_services/etudiant.service';
import { ClasseService } from '../_services/classe.service';
import { AdminService } from '../_services/admin.service';
import { EnseignantService } from '../_services/enseignant.service';
import { ModuleService } from '../_services/module.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    EtudiantService,
    ClasseService,
    EnseignantService,
    AdminService,
    ModuleService
  ]
})
export class ModelModule { }
