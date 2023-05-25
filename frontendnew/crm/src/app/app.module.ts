import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';

import { ClientListComponent } from './features/client/client-list/client-list.component';
import { EmployeeDashboardComponent } from './features/dashboards/employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './features/dashboards/manager-dashboard/manager-dashboard.component';
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
import { EventFormComponent } from './features/event/event-form/event-form.component';
import { EventListComponent } from './features/event/event-list/event-list.component';
import { EventEditComponent } from './features/event/event-edit/event-edit.component';
import { NotificationComponent } from './features/notifications/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    OwnerDashboardComponent,
    EmployeeDashboardComponent,
    ClientListComponent,
    AdminRegisterComponent,
    ClientAddComponent,
    ClientEditComponent,
    AdminListComponent,
    ContractAddComponent,
    ContractListComponent,
    ManagerSearchComponent,
    EmployeeSearchComponent,
    AdminDetailsComponent,
    AdminEditComponent,
    EventFormComponent,
    EventListComponent,
    EventEditComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
