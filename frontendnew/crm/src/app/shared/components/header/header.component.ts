import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/auth.service';
import { RoleResponse } from '../../models/role-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService, private router: Router) { }

  goToDashboard(): void {
    this.authService.getUserRole().subscribe((response: RoleResponse) => {
      const userRole = response.name;
      this.authService.userRole = userRole;
      console.log(`User role is ${userRole}`);
      if (userRole === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      } else if (userRole === 'MANAGER') {
        this.router.navigate(['/manager-dashboard']);
      } else if (userRole === 'OWNER') {
        this.router.navigate(['/owner-dashboard']);
      } else if (userRole === 'EMPLOYEE') {
        this.router.navigate(['/employee-dashboard']);
      } else {
        console.log('no role');
      }
    }, error => {
      console.error(`error: ${error.message}`);
    });
    
    
  };

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
