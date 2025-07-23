import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from './shopping.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fdc-shopping',
  standalone: false,
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css',
})
export class ShoppingComponent implements OnInit, OnDestroy {
  items!: Item[];
  itChangeSub!: Subscription;

  constructor(
    private slService: ShoppingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.slService.getItems();
    this.itChangeSub = this.slService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  onEditItems(index: number) {
    this.slService.startedEditing.next(index);
    this.slService.getItem(index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.itChangeSub.unsubscribe();
  }
}
