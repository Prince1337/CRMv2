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

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe(
      (response: RoleResponse) => {
        this.userRole = response.name;
        console.log(`User role is ${this.userRole}`);
        this.authService.userRole = this.userRole;
        console.log(this.authService.userRole);
      }
    )
  }

  goToSearch() {
    this.userRole = this.authService.userRole;
    console.log(this.userRole);
    if (this.userRole === 'MANAGER') {
      this.router.navigate(['/manager/search']);
    } else if (this.userRole === 'EMPLOYEE') {
      this.router.navigate(['/employee/search']);
    }
  }




}
