import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dinner } from '../dinners/dinner.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/calendar';

  constructor(private http: HttpClient) {}

  getCalendarData(): Observable<Dinner[]> {
    return this.http.get<Dinner[]>(this.apiUrl);
  }
}
