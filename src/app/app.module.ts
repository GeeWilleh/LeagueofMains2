import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccountComponent } from './account/account.component';
import { ChampionsComponent } from './champions/champions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AccountComponent,
    ChampionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
