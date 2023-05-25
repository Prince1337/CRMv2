import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventRequest } from 'src/app/shared/models/event-request';
import { EventResponse } from 'src/app/shared/models/event-response';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'https://localhost:8443/events'; // Anpassen der Basis-URL entsprechend Ihrer Serverkonfiguration

  constructor(private http: HttpClient) { }

  addEvent(eventRequest: EventRequest): Observable<EventResponse> {
    const url = `${this.baseUrl}`;
    const headers = this.getAuthentication();
    console.log(eventRequest);
    return this.http.post<EventResponse>(url, eventRequest, { headers: headers });
  }

  getAllEvents(): Observable<EventResponse[]> {
    const url = `${this.baseUrl}`;
    const headers = this.getAuthentication();
    return this.http.get<EventResponse[]>(url, { headers: headers });
  }

  getEventById(eventId: number): Observable<EventResponse> {
    const url = `${this.baseUrl}/${eventId}`;
    const headers = this.getAuthentication();

    return this.http.get<EventResponse>(url, { headers: headers });
  }

  updateEvent(eventId: number, eventRequest: EventRequest): Observable<EventResponse> {
    const url = `${this.baseUrl}/${eventId}`;
    const headers = this.getAuthentication();

    return this.http.put<EventResponse>(url, eventRequest, { headers: headers });
  }

  markNotificationAsRead(notificationId: number) {
    const url = `${this.baseUrl}/notifications/${notificationId}/mark-read`;
    const headers = this.getAuthentication();
    return this.http.put(url, null, { headers: headers });
  }

  private getAuthentication() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }



}
