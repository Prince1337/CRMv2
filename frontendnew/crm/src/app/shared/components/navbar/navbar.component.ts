import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/auth.service';
import { RoleResponse } from '../../models/role-response';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userRole!: string;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.getUserRole().subscribe((response: RoleResponse) => {
      this.userRole = response.name;
    console.log(`User role is ${this.userRole}`);
    })
  }

  isAuthorized(roles: Array<string>): boolean {
    return roles.includes(this.userRole);
  }

  goToSearch() {
    this.authService.getUserRole().subscribe((response: RoleResponse) => {
      this.userRole = response.name;
    console.log(`User role is ${this.userRole}`);
    })
    if (this.userRole != 'EMPLOYEE') {
      this.router.navigate(['/manager/search']);
    } else if (this.userRole === 'EMPLOYEE') {
      this.router.navigate(['/employee/search']);
    }
  }

}
