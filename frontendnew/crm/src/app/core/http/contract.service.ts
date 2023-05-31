import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractRequest } from 'src/app/shared/models/contract-request';
import { ContractResponse } from 'src/app/shared/models/contract-response';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private apiUrl = 'https://localhost:8443/contracts';
  private adminUrl = 'https://localhost:8443/contracts/admin';

  constructor(private http: HttpClient) { }

  generateContract(contractRequest: ContractRequest): Observable<ContractResponse> {
    const headers = this.getAuthentication();
    const clientId = contractRequest.clientId;
    return this.http.post<ContractResponse>(`${this.apiUrl}/${clientId}`, contractRequest, { headers: headers });
  }

  getAllContracts(): Observable<ContractResponse[]> {
    const headers = this.getAuthentication();

    return this.http.get<ContractResponse[]>(this.apiUrl, {headers: headers});
  }

  getAllContractsAdmin(): Observable<ContractResponse[]> {
    const headers = this.getAuthentication();

    return this.http.get<ContractResponse[]>(this.adminUrl, {headers: headers});
  }

  getContractById(id: number): Observable<ContractResponse> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.getAuthentication();

    return this.http.get<ContractResponse>(url, { headers: headers });
  }

  acceptContract(contractId: number): Observable<void> {
    const url = `${this.apiUrl}/${contractId}/accept`;
    const headers = this.getAuthentication();
    return this.http.put<void>(url, {}, { headers: headers });
  }

  private getAuthentication() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
}
