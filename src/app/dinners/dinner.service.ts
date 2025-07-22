import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dinner } from './dinner.model';

@Injectable({
  providedIn: 'root',
})
export class DinnerService {
  private apiUrl = 'http://localhost:3000/dinners';

  constructor(private http: HttpClient) {}

  getDinners(): Observable<Dinner[]> {
    return this.http.get<Dinner[]>(this.apiUrl);
  }
}
