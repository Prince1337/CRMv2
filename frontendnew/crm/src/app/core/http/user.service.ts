import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/shared/models/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:8443/users/admin';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserResponse[]> {
    const headers = this.getAuthentication();
    return this.http.get<UserResponse[]>(`${this.baseUrl}`+ `/users`, { headers: headers });
  }

  private getAuthentication() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
}
