import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DinnersComponent } from './dinners/dinners.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingEditComponent } from './shopping/shopping-edit/shopping-edit.component';
import { DinnerEditComponent } from './dinners/dinner-edit/dinner-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    DinnersComponent,
    ShoppingComponent,
    ShoppingEditComponent,
    DinnerEditComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
