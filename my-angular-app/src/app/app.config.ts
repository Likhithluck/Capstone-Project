import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Zone change detection settings
    provideRouter(routes),  // Provide the routes directly for routing functionality
  ],
  
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error('Error during bootstrapping:', err));
