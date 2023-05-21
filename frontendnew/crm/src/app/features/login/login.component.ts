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

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    const authenticationRequest: AuthenticationRequest = {
      username: this.username,
      password: this.password
    }
    this.authService.login(authenticationRequest).subscribe(
      (response: AuthenticationResponse) => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        this.goToDashboard();
        console.log(response);
      },
      (error) => {
        alert("Invalid username or password");
        console.error(error.message);
      }
    );
  }

  public goToDashboard(): void {
    this.authService.getUserRole().subscribe((response: RoleResponse) => {
      const userRole = response.name;
      console.log(`User role is ${userRole}`);
      this.authService.userRole = userRole;
      console.log(this.authService.userRole);
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
}

interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}



