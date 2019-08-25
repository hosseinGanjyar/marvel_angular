import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AngularFullpageModule } from '@fullpage/angular-fullpage';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFullpageModule ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
