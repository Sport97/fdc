import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './shopping.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  itemsChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();

  private items: Item[] = [];
  private apiUrl = 'http://localhost:3000/shopping';

  constructor(private http: HttpClient) {}

  getItems() {
    this.http
      .get<Item[]>(this.apiUrl)
      .pipe(map((items) => items.map((i) => new Item(i.name, i.amount))))
      .subscribe((items) => {
        this.items = items;
        this.itemsChanged.next(this.items.slice());
      });
  }

  getItem(index: number) {
    return this.items[index];
  }

  addItem(item: Item) {
    this.http
      .post<{ message: string; item: any }>(this.apiUrl, item)
      .subscribe((response) => {
        const newItem = new Item(response.item.name, response.item.amount);
        this.items.push(newItem);
        this.itemsChanged.next(this.items.slice());
      });
  }

  addItems(items: Item[]) {
    this.http
      .post<{ message: string; item: any }>(this.apiUrl, items)
      .subscribe((response) => {
        const newItem = new Item(response.item.name, response.item.amount);
        this.items.push(newItem);
        this.itemsChanged.next(this.items.slice());
      });
  }

  updateItems(index: number, newItem: Item) {
    const itemId = this.items[index]['_id'];
    this.http.put(`${this.apiUrl}/${itemId}`, newItem).subscribe(() => {
      this.items[index] = newItem;
      this.itemsChanged.next(this.items.slice());
    });
  }

  deleteItem(index: number) {
    const itemId = this.items[index]['_id'];
    this.http.delete(`${this.apiUrl}/${itemId}`).subscribe(() => {
      this.items.splice(index, 1);
      this.itemsChanged.next(this.items.slice());
    });
  }
}
