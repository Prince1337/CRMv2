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
import { NotificationComponent } from './features/notifications/notification/notification.component';
import { HomeComponent } from './features/home/home/home.component';
import { ClientDetailsComponent } from './features/client/client-details/client-details.component';
import { ContractDetailsComponent } from './features/contract/contract-details/contract-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'MANAGER', 'OWNER', 'EMPLOYEE']},
    children: [
      { 
        path: 'admin-dashboard', 
        component: AdminDashboardComponent, 
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN']}
      },
      { 
        path: 'manager-dashboard', 
        component: ManagerDashboardComponent, 
        canActivate: [AuthGuard],
        data: { roles: ['MANAGER']}
      },
      {
        path: 'owner-dashboard',
        component: OwnerDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['OWNER']}
      },
      {
        path: 'employee-dashboard',
        component: EmployeeDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EMPLOYEE']}
      },
      {
        path: 'clients',
        component: ClientListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'clients/add',
        component: ClientAddComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'clients/details/:id',
        component: ClientDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'clients/edit/:id',
        component: ClientEditComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'users/add',
        canActivate: [AuthGuard],
        component: AdminRegisterComponent,
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'users/edit/:id',
        component: AdminEditComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'users/details/:id',
        component: AdminDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'users',
        component: AdminListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'OWNER']}
      },
      {
        path: 'contracts/add',
        component: ContractAddComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contracts/details/:id',
        component: ContractDetailsComponent,
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
        data: { roles: ['MANAGER', 'OWNER', 'ADMIN']}
      },
      {
        path: 'employee/search',
        component: EmployeeSearchComponent,
        canActivate: [AuthGuard],
        data: { roles: ['MANAGER', 'OWNER', 'EMPLOYEE']}
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
      {
        path: 'notifications',
        component: NotificationComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: 'dashboard' }, // wenn eine ungültige URL aufgerufen wird
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }, // wenn eine ungültige URL aufgerufen wird
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
