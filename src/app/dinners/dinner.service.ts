import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dinner } from './dinner.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DinnerService {
  dinnersChanged = new Subject<Dinner[]>();
  startedEditing = new Subject<any>();

  private dinners: Dinner[] = [];
  private apiUrl = 'http://localhost:3000/dinners';

  constructor(private http: HttpClient) {}

  getDinners() {
    this.http
      .get<Dinner[]>(this.apiUrl)
      .pipe(
        map((dinners) =>
          dinners.map(
            (d: any) => new Dinner(d.date, d.food, d.host, d.guest, d._id)
          )
        )
      )
      .subscribe((dinners) => {
        this.dinners = dinners;
        this.dinnersChanged.next(this.dinners.slice());
      });
  }

  getDinner(index: any) {
    return this.dinners[index];
  }

  getDinnerById(_id: string): Dinner | null {
    return this.dinners.find((dinner) => dinner._id === _id) || null;
  }

  getIndexById(id: string): number {
    return this.dinners.findIndex((d) => d._id === id);
  }

  addDinner(dinner: Dinner) {
    this.http
      .post<{ message: string; dinner: any }>(this.apiUrl, dinner)
      .subscribe((response) => {
        const newDinner = new Dinner(
          response.dinner.date,
          response.dinner.food,
          response.dinner.host,
          response.dinner.guest,
          response.dinner._id
        );
        this.dinners.push(newDinner);
        this.dinnersChanged.next(this.dinners.slice());
      });
  }

  updateDinner(index: any, newDinner: any) {
    const dinnerId = this.dinners[index]._id;
    if (!dinnerId) {
      console.error('Cannot update dinner without _id');
      return;
    }
    this.http
      .put<Dinner>(
        `${this.apiUrl}/${dinnerId}`,
        {
          date: newDinner.date,
          food: newDinner.food,
          host: newDinner.host,
          guest: newDinner.guest,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe((updatedDinner) => {
        this.dinners[index] = updatedDinner;
        this.dinnersChanged.next(this.dinners.slice());
      });
  }

  deleteDinner(index: any) {
    const dinnerId = this.dinners[index]._id;
    this.http.delete(`${this.apiUrl}/${dinnerId}`).subscribe(() => {
      this.dinners.splice(index, 1);
      this.dinnersChanged.next(this.dinners.slice());
    });
  }
}
