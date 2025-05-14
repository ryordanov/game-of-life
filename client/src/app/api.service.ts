import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<{ rows: number; cols: number; size: number; delay: number } | null> {
    return this.http.get<{ rows: number; cols: number; size: number; delay: number } | null>(`${this.apiUrl}/getConfig`);
  }

  sendMessage(message: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.apiUrl}/sendNotification`, { message });
  }
}