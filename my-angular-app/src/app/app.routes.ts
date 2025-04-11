import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; // Import your homepage component
import { AllInvoicesComponent } from './all-invoices/all-invoices.component'; // Import your standalone component

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  { path: 'home', component: HomepageComponent },
  { path: 'allInvoices', component: AllInvoicesComponent }
  // Add other routes here
];

@NgModule({
  declarations: [ ],
  imports: [
    RouterModule.forRoot(routes) // Import RouterModule here
  ],
  providers: [],
})
export class AppModule { }