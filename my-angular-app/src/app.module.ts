import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HomepageComponent } from './app/homepage/homepage.component';
import { AllInvoicesComponent } from './app/all-invoices/all-invoices.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AllInvoicesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
