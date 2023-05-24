import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './core/auth/auth.guard';
import { ManagerDashboardComponent } from './features/dashboards/manager-dashboard/manager-dashboard.component';
import { EmployeeDashboardComponent } from './features/dashboards/employee-dashboard/employee-dashboard.component';
import { ClientListComponent } from './features/client/client-list/client-list.component';
import { OwnerDashboardComponent } from './features/dashboards/owner-dashboard/owner-dashboard.component';
import { AdminRegisterComponent } from './features/admin/admin-register/admin-register.component';
import { ClientAddComponent } from './features/client/client-add/client-add.component';
import { ClientEditComponent } from './features/client/client-edit/client-edit.component';
import { AdminListComponent } from './features/admin/admin-list/admin-list.component';
import { ContractAddComponent } from './features/contract/contract-add/contract-add.component';
import { ContractListComponent } from './features/contract/contract-list/contract-list.component';
import { ManagerSearchComponent } from './features/search/manager-search/manager-search.component';
import { EmployeeSearchComponent } from './features/search/employee-search/employee-search.component';
import { AdminDetailsComponent } from './features/admin/admin-details/admin-details.component';
import { AdminEditComponent } from './features/admin/admin-edit/admin-edit.component';
import { EventListComponent } from './features/event/event-list/event-list.component';
import { EventFormComponent } from './features/event/event-form/event-form.component';
import { EventEditComponent } from './features/event/event-edit/event-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard],
  },
  { 
    path: 'manager-dashboard', 
    component: ManagerDashboardComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: 'owner-dashboard',
    component: OwnerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    component: ClientListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients/add',
    component: ClientAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients/edit/:id',
    component: ClientEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/add',
    component: AdminRegisterComponent
  },
  {
    path: 'users/edit/:id',
    component: AdminEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/details/:id',
    component: AdminDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: AdminListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contracts/add',
    component: ContractAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contracts',
    component: ContractListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manager/search',
    component: ManagerSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/search',
    component: EmployeeSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/add',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/:id',
    component: EventEditComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'dashboard' }, // wenn eine ungültige URL aufgerufen wird
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
