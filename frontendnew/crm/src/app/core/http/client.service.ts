import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRequest } from 'src/app/shared/models/client-request';
import { ClientResponse } from 'src/app/shared/models/client-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'https://localhost:8443';
  private searchUrl = 'https://localhost:8443/employeeSearch';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<ClientResponse[]> {
    const headers = this.getAuthentication();

    return this.http.get<[]>(`${this.baseUrl}/clients`, { headers: headers });
  }

  getContactEmails(): Observable<string[]> {
    const headers = this.getAuthentication();

    return this.http.get<string[]>(`${this.baseUrl}/contactPersons`, { headers: headers });
  }

  getUsernames(): Observable<string[]> {
    const headers = this.getAuthentication();

    return this.http.get<string[]>(`${this.baseUrl}/users`, { headers: headers });
  }

  createClient(clientData: ClientRequest): Observable<ClientResponse> {
    const headers = this.getAuthentication();

    return this.http.post<ClientResponse>(`${this.baseUrl}/clients`, clientData, { headers: headers });
  }

  updateClient(id: number, request: ClientRequest): Observable<ClientResponse> {
    const url = `${this.baseUrl}/clients/${id}`;
    const headers = this.getAuthentication();

    return this.http.put<ClientResponse>(url, request, { headers: headers });
  }

  getClientById(id: number): Observable<ClientResponse> {
    const url = `${this.baseUrl}/clients/${id}`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse>(url, { headers: headers });
  }

  deleteClient(id: number): Observable<void> {
    const url = `${this.baseUrl}/clients/${id}`;
    const headers = this.getAuthentication();

    return this.http.delete<void>(url, { headers: headers });
  }

  getDefaultSearch(): Observable<ClientResponse[]> {
    const url = `${this.searchUrl}`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse[]>(url, { headers: headers });
  }

  searchByCity(city: string): Observable<ClientResponse[]> {
    const url = `${this.searchUrl}/city?city=${city}`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse[]>(url, { headers: headers });
  }

  managerGetAllClients(): Observable<ClientResponse[]> {
    const url = `${this.baseUrl}/managerSearch/all`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse[]>(url, { headers: headers });
  }

  managerSearchByCity(city: string): Observable<ClientResponse[]> {
    const url = `${this.baseUrl}/managerSearch/city?city=${city}`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse[]>(url, { headers: headers });
  }

  managerSearchByRegion(region: string): Observable<ClientResponse[]> {
    const url = `${this.baseUrl}/managerSearch/region?region=${region}`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse[]>(url, { headers: headers });
  }

  managerSearchByName(name: string): Observable<ClientResponse[]> {
    const url = `${this.baseUrl}/managerSearch/name?name=${name}`;
    const headers = this.getAuthentication();

    return this.http.get<ClientResponse[]>(url, { headers: headers });
  }

  private getAuthentication() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
}

