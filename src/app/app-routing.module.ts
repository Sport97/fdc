import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DinnersComponent } from './dinners/dinners.component';
import { ShoppingComponent } from './shopping/shopping.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'dinners',
    component: DinnersComponent,
    //   children: [
    //     { path: 'new', component: DinnerEditComponent },
    //     { path: ':id', component: DinnerDetailComponent },
    //     { path: ':id/edit', component: DinnerEditComponent },
    //   ],
  },
  {
    path: 'shopping',
    component: ShoppingComponent,
    //   children: [
    //     { path: 'new', component: ShoppingEditComponent },
    //     { path: ':id', component: ShoppingDetailComponent },
    //     { path: ':id/edit', component: ShoppingEditComponent },
    //   ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
