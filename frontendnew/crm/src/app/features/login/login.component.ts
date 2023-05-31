import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/auth.service';
import { AuthenticationRequest } from 'src/app/shared/models/authentication-request';
import { RoleResponse } from 'src/app/shared/models/role-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  login() {
    const authenticationRequest: AuthenticationRequest = {
      username: this.username,
      password: this.password
    }
    this.authService.login(authenticationRequest).subscribe(
      (response: AuthenticationResponse) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.authService.getUserRole().subscribe((response: RoleResponse) => {
          this.authService.userRole = response.name;
          console.log(`User role is ${this.authService.userRole}`);
          this.goToDashboard();
        });
      console.log(response);
      },
      (error) => {
        alert("Invalid username or password");
        console.error(error.message);
      }
    );
  }

  public goToDashboard(): void {
    const userRole = this.authService.userRole;
    console.log(`goToDashboard userRole is ` + this.authService.userRole);
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
  };
}

interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}



