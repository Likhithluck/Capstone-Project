import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; 
import { AllInvoicesComponent } from './all-invoices/all-invoices.component'; 
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'allInvoices', component: AllInvoicesComponent },
  { path: 'login', component: LoginComponent }, // Add the login route here
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }