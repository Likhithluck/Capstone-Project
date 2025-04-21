import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HomepageComponent } from './app/homepage/homepage.component';
import { AllInvoicesComponent } from './app/all-invoices/all-invoices.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SInvoicesComponent } from './app/s-invoices/s-invoices.component';
import { DataTablesModule } from 'angular-datatables'; // Importing DataTablesModule
import { UploadComponent } from './app/upload/upload.component';
import { AdSearchComponent } from './app/ad-search/ad-search.component';

@NgModule({
declarations: [],
  imports: [
    SInvoicesComponent,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AllInvoicesComponent,
    HomepageComponent,
    AppComponent,
    DataTablesModule ,
    UploadComponent,
    AdSearchComponent // <-- Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
