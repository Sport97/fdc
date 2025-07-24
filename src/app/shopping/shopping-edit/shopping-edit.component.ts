import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Item } from '../shopping.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fdc-shopping-edit',
  standalone: false,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: any;
  editedItem!: Item;

  constructor(
    private slService: ShoppingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: any) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getItem(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newItem = this.editMode
      ? new Item(value.name, +value.amount, this.editedItem._id)
      : new Item(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateItem(this.editedItemIndex, newItem);
      this.router.navigate(['/shopping']);
    } else {
      this.slService.addItem(newItem);
      this.router.navigate(['/shopping']);
    }
    this.editMode = false;
    form.reset();
    this.router.navigate(['/shopping']);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.router.navigate(['/shopping']);
  }

  onDelete() {
    this.slService.deleteItem(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
