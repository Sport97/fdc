import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Dinner } from '../dinners/dinner.model';

interface CalendarCell {
  day: number | null;
  food?: string;
  host?: string;
  guest?: string;
  isSaturday?: boolean;
}

@Component({
  selector: 'fdc-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  hostsByWeekday: (string | null)[] = new Array(7).fill(null);
  calendar: CalendarCell[][] = [];

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();
  monthName: string = '';

  backendEntries: Dinner[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getCalendarData().subscribe((entries) => {
      this.backendEntries = entries;
      this.buildCalendar(this.year, this.month);
    });
  }

  buildCalendar(year: number, month: number): void {
    this.calendar = [];

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    this.monthName = new Date(year, month).toLocaleString('default', {
      month: 'long',
    });

    let week: CalendarCell[] = new Array(firstDay).fill({ day: null });

    this.hostsByWeekday = new Array(7).fill(null);

    for (let day = 1; day <= totalDays; day++) {
      const dateStr = this.formatDate(year, month + 1, day);
      const entry = this.backendEntries.find((e) => e.date === dateStr);
      const currentDate = new Date(year, month, day);
      const weekday = currentDate.getDay();
      const isSaturday = weekday === 6;

      // if (entry && !this.hostsByWeekday[weekday]) {
      //   this.hostsByWeekday[weekday] = entry.host;
      // }

      week.push({
        day,
        food: entry?.food,
        host: entry?.host,
        guest: entry?.guest,
        isSaturday,
      });

      if (week.length === 7) {
        this.calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ day: null });
      }
      this.calendar.push(week);
    }
  }

  formatDate(year: number, month: number, day: number): string {
    const mm = month.toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }
}
