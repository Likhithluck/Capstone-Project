import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; 
import { AllInvoicesComponent } from './all-invoices/all-invoices.component'; 

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'allInvoices', component: AllInvoicesComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }