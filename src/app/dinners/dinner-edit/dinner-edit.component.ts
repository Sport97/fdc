import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Dinner } from '../dinner.model';
import { DinnerService } from '../dinner.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fdc-dinner-edit',
  standalone: false,
  templateUrl: './dinner-edit.component.html',
  styleUrl: './dinner-edit.component.css',
})
export class DinnerEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedDinnerIndex!: any;
  editedDinner!: Dinner;

  constructor(
    private drService: DinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.drService.startedEditing.subscribe(
      (index: any) => {
        this.editedDinnerIndex = index;
        this.editMode = true;
        this.editedDinner = this.drService.getDinner(index);
        this.slForm.setValue({
          date: this.editedDinner.date,
          food: this.editedDinner.food,
          host: this.editedDinner.host,
          guest: this.editedDinner.guest,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDinner = this.editMode
      ? new Dinner(
          value.date,
          value.food,
          value.host,
          value.guest,
          this.editedDinner._id
        )
      : new Dinner(value.date, value.food, value.host, value.guest);
    if (this.editMode) {
      this.drService.updateDinner(this.editedDinnerIndex, newDinner);
      this.router.navigate(['/dinners']);
    } else {
      this.drService.addDinner(newDinner);
      this.router.navigate(['/dinners']);
    }
    this.editMode = false;
    form.reset();
    this.router.navigate(['/dinners']);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.router.navigate(['/dinners']);
  }

  onDelete() {
    this.drService.deleteDinner(this.editedDinnerIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
