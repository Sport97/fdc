import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendar } from './calendar.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/calendar';

  constructor(private http: HttpClient) {}

  getCalendarData(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.apiUrl);
  }
}
