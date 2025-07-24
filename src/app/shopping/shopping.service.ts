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
  startedEditing = new Subject<any>();

  private items: Item[] = [];
  private apiUrl = 'http://localhost:3000/shopping';

  constructor(private http: HttpClient) {}

  getItems() {
    this.http
      .get<Item[]>(this.apiUrl)
      .pipe(
        map((items) => items.map((i: any) => new Item(i.name, i.amount, i._id)))
      )
      .subscribe((items) => {
        this.items = items;
        this.itemsChanged.next(this.items.slice());
      });
  }

  getItemById(_id: string): Item | null {
    return this.items.find((item) => item._id === _id) || null;
  }

  getItem(index: any) {
    return this.items[index];
  }

  addItem(item: Item) {
    this.http
      .post<{ message: string; item: any }>(this.apiUrl, item)
      .subscribe((response) => {
        const newItem = new Item(
          response.item.name,
          response.item.amount,
          response.item._id
        );
        this.items.push(newItem);
        this.itemsChanged.next(this.items.slice());
      });
  }

  updateItem(index: any, newItem: any) {
    const itemId = this.items[index]._id;
    if (!itemId) {
      console.error('Cannot update item without _id');
      return;
    }
    this.http
      .put<Item>(
        `${this.apiUrl}/${itemId}`,
        {
          name: newItem.name,
          amount: +newItem.amount,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe((updatedItem) => {
        this.items[index] = updatedItem;
        this.itemsChanged.next(this.items.slice());
      });
  }

  deleteItem(index: any) {
    const itemId = this.items[index]._id;
    this.http.delete(`${this.apiUrl}/${itemId}`).subscribe(() => {
      this.items.splice(index, 1);
      this.itemsChanged.next(this.items.slice());
    });
  }
}
