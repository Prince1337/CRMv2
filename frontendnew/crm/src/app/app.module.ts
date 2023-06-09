import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';


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
    ContractListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    HttpClientTestingModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
