import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/shared/models/authentication-request';
import { RegisterRequest } from 'src/app/shared/models/register-request';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userRole!: string;

  public get userRole(): string {
    return this._userRole;
  }
  
  public set userRole(value: string) {
    this._userRole = value;
  }

  authUrl = 'https://localhost:8443/auth';
  roleUrl = 'https://localhost:8443/role';
  private isLoggedInVar = new BehaviorSubject<boolean>(false);

  authenticationRequest!: AuthenticationRequest;

  constructor(private http: HttpClient) { }

  registerAdmin(registerData: RegisterRequest): Observable<AuthenticationResponse> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<AuthenticationResponse>(this.authUrl + '/admin/register', registerData, { headers });
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    this.isLoggedInVar.next(true);
    return this.http.post<AuthenticationResponse>(this.authUrl + '/authenticate', authenticationRequest)
  }

  logout(): void {
    this.isLoggedInVar.next(false);
    this.http.post(this.authUrl + '/logout', {}).subscribe(() => {
      // Optional: Führe hier weitere Aktionen nach dem erfolgreichen Logout aus
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      console.log('Logout erfolgreich');
    }, (error) => {
      console.error('Logout fehlgeschlagen', error.message);
    });
  }

  getUserRole(): Observable<RoleResponse> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<RoleResponse>(this.roleUrl + '/getUserRole', { headers });
  }

  get isAuthenticated$() {
    if(localStorage.getItem('access_token')) {
      this.isLoggedInVar.next(true);
    }
    return this.isLoggedInVar.asObservable();
  }

}


interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}

interface RoleResponse {
  id: number;
  name: string;
}
