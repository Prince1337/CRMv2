import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationResponse } from 'src/app/shared/models/notification-response';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getAllNotifications() {
    const headers = this.getAuthentication();

    return this.http.get<NotificationResponse[]>('https://localhost:8443/notifications', { headers: headers });
  }

  private getAuthentication() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
}
