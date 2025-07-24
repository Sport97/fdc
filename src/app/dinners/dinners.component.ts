import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dinner } from './dinner.model';
import { DinnerService } from './dinner.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fdc-dinners',
  standalone: false,
  templateUrl: './dinners.component.html',
  styleUrl: './dinners.component.css',
})
export class DinnersComponent implements OnInit, OnDestroy {
  dinners!: Dinner[];
  drChangeSub!: Subscription;

  constructor(
    private drService: DinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.drService.getDinners();
    this.drChangeSub = this.drService.dinnersChanged.subscribe(
      (dinners: Dinner[]) => {
        this.dinners = dinners.sort((a, b) => b.date.localeCompare(a.date));
      }
    );
  }

  onEditDinner(id: any) {
    const index = this.drService.getIndexById(id);
    if (index !== -1) {
      this.drService.startedEditing.next(index);
    }
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.drChangeSub.unsubscribe();
  }
}
