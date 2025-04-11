import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AllInvoicesComponent } from './app/all-invoices/all-invoices.component';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  