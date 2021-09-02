import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './modules/admin/admin.component';
import {ClasseComponent} from './modules/classe/classe.component';
import {EnseignantComponent} from './modules/enseignant/enseignant.component';
import {EtudiantComponent} from './modules/etudiant/etudiant.component';
import {ModuleComponent} from './modules/module/module.component';
import {ParentComponent} from './modules/parent/parent.component';
import {LoginComponent} from './modules/login';
import {HomeComponent} from './modules/home/home.component';

import {AuthGuard} from './_helpers/auth.guard';
import {ParentLoginComponent} from './modules/login/parent-login/parent-login.component';
import {EnseignantLoginComponent} from './modules/login/enseignant-login/enseignant-login.component';
import {AdminLoginComponent} from './modules/login/admin-login/admin-login.component';
import {EtudiantListComponent} from './modules/etudiant/users/etudiant-list/etudiant-list.component';
import {EnseignantListComponent} from './modules/enseignant/users/enseignant-list/enseignant-list.component';
import {ModuleListComponent} from './modules/module/module-list/module-list.component';
import {ClasseListComponent} from './modules/classe/classe-list/classe-list.component';
import {ParentListComponent} from './modules/parent/parent-list/parent-list.component';
import {AdminListComponent} from './modules/admin/users/admin-list/admin-list.component';
import {AdminDetailComponent} from './modules/admin/users/admin-detail/admin-detail.component';
import {ClasseDetailComponent} from './modules/classe/classe-detail/classe-detail.component';
import {EnseignantDetailComponent} from './modules/enseignant/users/enseignant-detail/enseignant-detail.component';
import {EtudiantDetailComponent} from './modules/etudiant/users/etudiant-detail/etudiant-detail.component';
import {ModuleDetailComponent} from './modules/module/module-detail/module-detail.component';
import {PlanEtudeListComponent} from './modules/admin/plan-etude/plan-etude-list/plan-etude-list.component';
import {PlanEtudeCreateComponent} from './modules/admin/plan-etude/plan-etude-create/plan-etude-create.component';
import {PlanEtudeDetailComponent} from './modules/admin/plan-etude/plan-etude-detail/plan-etude-detail.component';
import {NotFoundComponent} from './modules/error-pages/not-found/not-found.component';
import {InternalServerErrorComponent} from './modules/error-pages/internal-server-error/internal-server-error.component';
import {EmploiDuTempCreateComponent} from './modules/admin/emploi-du-temps/emploi-du-temp-create/emploi-du-temp-create.component';
import {EmploiDuTempListComponent} from './modules/admin/emploi-du-temps/emploi-du-temp-list/emploi-du-temp-list.component';
import {EmploiDuTempUpdateComponent} from './modules/admin/emploi-du-temps/emploi-du-temp-update/emploi-du-temp-update.component';
import {EmploiDuTempsDetailComponent} from './modules/admin/emploi-du-temps/emploi-du-temps-detail/emploi-du-temps-detail.component';
import {EmploiDuTempCreate1Component} from './modules/admin/emploi-du-temps/emploi-du-temp-create1/emploi-du-temp-create1.component';
import {SaisieNotesComponent} from './modules/enseignant/saisie-notes/saisie-notes.component';
import {AdminCreateComponent} from './modules/admin/users/admin-create/admin-create.component';
import {EtudiantCreateComponent} from './modules/etudiant/users/etudiant-create/etudiant-create.component';
import {EnseignantCreateComponent} from './modules/enseignant/users/enseignant-create/enseignant-create.component';
// import { } from '../app/modules/admin/'

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '500', component: InternalServerErrorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-parent', component: ParentLoginComponent},
  {path: 'login-enseignant', component: EnseignantLoginComponent},
  {path: 'login-admin', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin-list', component: AdminListComponent},
  {path: 'admin-detail/:id', component: AdminDetailComponent},
  {path: 'admin-create', component: AdminCreateComponent},
  {path: 'classe', component: ClasseComponent},
  {path: 'classe-list', component: ClasseListComponent},
  {path: 'classe-detail/:id', component: ClasseDetailComponent},
  {path: 'enseignant', component: EnseignantComponent},
  {path: 'enseignant-list', component: EnseignantListComponent},
  {path: 'enseignant-detail/:id', component: EnseignantDetailComponent},
  {path: 'enseignant-create', component: EnseignantCreateComponent},
  {path: 'etudiant', component: EtudiantComponent},
  {path: 'etudiant-create', component: EtudiantCreateComponent},
  {path: 'etudiant-list', component: EtudiantListComponent},
  {path: 'etudiant-detail/:id', component: EtudiantDetailComponent},
  {path: 'module', component: ModuleComponent},
  {path: 'modules-list', component: ModuleListComponent},
  {path: 'module-detail/:id', component: ModuleDetailComponent},
  {path: 'plan-etude-list', component: PlanEtudeListComponent},
  {path: 'plan-etude-create', component: PlanEtudeCreateComponent},
  {path: 'plan-etude-detail/:id', component: PlanEtudeDetailComponent},
  {path: 'notes-list', component: SaisieNotesComponent},
  {path: 'emploi-du-temps-create', component: EmploiDuTempCreateComponent},
  {path: 'emploi-du-temps-list', component: EmploiDuTempListComponent},
  {path: 'emploi-du-temps-detail/:id', component: EmploiDuTempsDetailComponent},
  {path: 'emploi-du-temps-update/:id', component: EmploiDuTempUpdateComponent},
  {path: 'parent', component: ParentComponent},
  {path: 'parent/:id', component: ParentComponent},
  {path: 'parent-list', component: ParentListComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
