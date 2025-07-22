import { Component, OnInit } from '@angular/core';
import { Dinner } from './dinner.model';
import { DinnerService } from './dinner.service';

@Component({
  selector: 'fdc-dinners',
  standalone: false,
  templateUrl: './dinners.component.html',
  styleUrl: './dinners.component.css',
})
export class DinnersComponent implements OnInit {
  dinners: Dinner[] = [];

  constructor(private dinnerService: DinnerService) {}

  ngOnInit(): void {
    this.dinnerService.getDinners().subscribe({
      next: (data) => {
        this.dinners = data.sort((a, b) => b.date.localeCompare(a.date));
      },
      error: (err) => console.error('Error loading dinners:', err),
    });
  }
}
