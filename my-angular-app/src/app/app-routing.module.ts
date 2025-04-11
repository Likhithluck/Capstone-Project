import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';

const routes: Routes = [
  { path: 'invoices', component: AllInvoicesComponent },
  { path: '', redirectTo: '/invoices', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
