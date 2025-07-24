import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DinnersComponent } from './dinners/dinners.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingEditComponent } from './shopping/shopping-edit/shopping-edit.component';
import { DinnerEditComponent } from './dinners/dinner-edit/dinner-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'dinners',
    component: DinnersComponent,
    children: [
      { path: 'new', component: DinnerEditComponent },
      { path: ':id', component: DinnerEditComponent },
    ],
  },
  {
    path: 'shopping',
    component: ShoppingComponent,
    children: [
      { path: 'new', component: ShoppingEditComponent },
      { path: ':id', component: ShoppingEditComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
