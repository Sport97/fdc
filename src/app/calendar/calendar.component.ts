import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fdc-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: (number | null)[][] = [];

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();
  monthName: string = '';

  ngOnInit(): void {
    this.buildCalendar(this.year, this.month);
  }

  buildCalendar(year: number, month: number): void {
    this.calendar = [];

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    this.monthName = new Date(year, month).toLocaleString('default', {
      month: 'long',
    });

    let week: (number | null)[] = new Array(firstDay).fill(null);

    for (let day = 1; day <= totalDays; day++) {
      week.push(day);
      if (week.length === 7) {
        this.calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      this.calendar.push(week);
    }
  }
}
