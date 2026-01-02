import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { FormsModule } from '@angular/forms';
import { AdminHome } from './pages/admin-home/admin-home';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { CandidatsListComponent } from './components/candidats/candidats-list/candidats-list';
import { FormateursList } from './components/formateurs/formateurs-list/formateurs-list';
import { FormationsList } from './components/formations/formations-list/formations-list';
import { SessionsList } from './components/sessions/sessions-list/sessions-list';


@NgModule({
  declarations: [
    AdminHome,
    AdminDashboard,
    CandidatsListComponent,
    FormateursList,
    FormationsList,
    SessionsList
  ],
  imports: [
    CommonModule,// pour ngif,ngfor....
    AdminRoutingModule, 
    FormsModule //pour ngModel
  ]
})
export class AdminModule { }
