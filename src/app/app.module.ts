import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from './_models/model.module';

// Material import
import { AngularMaterialModule } from './angular-material.module';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';

// Component imports
import { EtudiantComponent } from './modules/etudiant/etudiant.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ParentComponent } from './modules/parent/parent.component';
import { ClasseComponent } from './modules/classe/classe.component';
import { EnseignantComponent } from './modules/enseignant/enseignant.component';
import { ModuleComponent } from './modules/module/module.component';
import { LoginComponent } from './modules/login';
import { HomeComponent } from './modules/home/home.component';
import { EtudiantLoginComponent } from './modules/login/etudiant-login/etudiant-login.component';
import { ParentLoginComponent } from './modules/login/parent-login/parent-login.component';
import { EnseignantLoginComponent } from './modules/login/enseignant-login/enseignant-login.component';
import { AdminLoginComponent } from './modules/login/admin-login/admin-login.component';
import { EtudiantListComponent } from './modules/etudiant/users/etudiant-list/etudiant-list.component';
import { EnseignantListComponent } from './modules/enseignant/users/enseignant-list/enseignant-list.component';
import { ModuleListComponent } from './modules/module/module-list/module-list.component';
import { ClasseListComponent } from './modules/classe/classe-list/classe-list.component';
import { ParentListComponent } from './modules/parent/parent-list/parent-list.component';
import { AdminListComponent } from './modules/admin/users/admin-list/admin-list.component';
import { PlanEtudeCreateComponent } from './modules/admin/plan-etude/plan-etude-create/plan-etude-create.component';
import { PlanEtudeListComponent } from './modules/admin/plan-etude/plan-etude-list/plan-etude-list.component';
import { PlanEtudeUpdateComponent } from './modules/admin/plan-etude/plan-etude-update/plan-etude-update.component';
import { EmploiDuTempCreateComponent } from './modules/admin/emploi-du-temps/emploi-du-temp-create/emploi-du-temp-create.component';
import { EmploiDuTempListComponent } from './modules/admin/emploi-du-temps/emploi-du-temp-list/emploi-du-temp-list.component';
import { EmploiDuTempUpdateComponent } from './modules/admin/emploi-du-temps/emploi-du-temp-update/emploi-du-temp-update.component';
import { AdminUpdateComponent } from './modules/admin/users/admin-update/admin-update.component';
import { AdminDetailComponent } from './modules/admin/users/admin-detail/admin-detail.component';
import { ClasseDetailComponent } from './modules/classe/classe-detail/classe-detail.component';
import { EnseignantDetailComponent } from './modules/enseignant/users/enseignant-detail/enseignant-detail.component';
import { EtudiantDetailComponent } from './modules/etudiant/users/etudiant-detail/etudiant-detail.component';
import { ModuleDetailComponent } from './modules/module/module-detail/module-detail.component';
import { PlanEtudeDetailComponent } from './modules/admin/plan-etude/plan-etude-detail/plan-etude-detail.component';
import { NotFoundComponent } from './modules/error-pages/not-found/not-found.component';
import { InternalServerErrorComponent } from './modules/error-pages/internal-server-error/internal-server-error.component';
import { EmploiDuTempsDetailComponent } from './modules/admin/emploi-du-temps/emploi-du-temps-detail/emploi-du-temps-detail.component';
import { AdminCreateComponent } from './modules/admin/users/admin-create/admin-create.component';
import { ClasseCreateComponent } from './modules/classe/classe-create/classe-create.component';
import { EnseignantCreateComponent } from './modules/enseignant/users/enseignant-create/enseignant-create.component';
import { EnseignantUpdateComponent } from './modules/enseignant/users/enseignant-update/enseignant-update.component';
import { EtudiantCreateComponent } from './modules/etudiant/users/etudiant-create/etudiant-create.component';
import { EtudiantUpdateComponent } from './modules/etudiant/users/etudiant-update/etudiant-update.component';
import { ModuleCreateComponent } from './modules/module/module-create/module-create.component';
import { ModuleUpdateComponent } from './modules/module/module-update/module-update.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SaisieNotesComponent } from './modules/enseignant/saisie-notes/saisie-notes.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { EmploiDuTempCreate1Component } from './modules/admin/emploi-du-temps/emploi-du-temp-create1/emploi-du-temp-create1.component';
import {PlanEtudeService} from './_services';
import {NotesServices} from './_services/notes.services';
import { ClasseUpdateComponent } from './modules/classe/classe-update/classe-update.component';
import {EmploiDuTempService} from "./_services/emploi-du-temp.service";
import { ToolbarComponent } from './modules/navigations/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    AdminComponent,
    ParentComponent,
    ClasseComponent,
    ClasseCreateComponent,
    EnseignantComponent,
    ModuleComponent,
    LoginComponent,
    HomeComponent,
    EtudiantLoginComponent,
    ParentLoginComponent,
    EnseignantLoginComponent,
    AdminLoginComponent,
    EtudiantListComponent,
    EnseignantListComponent,
    ModuleListComponent,
    ClasseListComponent,
    ParentListComponent,
    AdminListComponent,
    AdminCreateComponent,
    PlanEtudeCreateComponent,
    PlanEtudeListComponent,
    PlanEtudeUpdateComponent,
    EmploiDuTempCreateComponent,
    EmploiDuTempListComponent,
    EmploiDuTempUpdateComponent,
    AdminUpdateComponent,
    AdminDetailComponent,
    ClasseDetailComponent,
    EnseignantDetailComponent,
    EnseignantCreateComponent,
    EnseignantUpdateComponent,
    EtudiantDetailComponent,
    EtudiantCreateComponent,
    EtudiantUpdateComponent,
    ModuleDetailComponent,
    ModuleCreateComponent,
    ModuleUpdateComponent,
    PlanEtudeDetailComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    SaisieNotesComponent,
    EmploiDuTempsDetailComponent,
    EmploiDuTempCreate1Component,
    ClasseUpdateComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ModelModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatToolbarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    CdkTableModule,
    MatSortModule,
    FlexLayoutModule,
    MatStepperModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [
    PlanEtudeService,
    NotesServices,
    EmploiDuTempService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
