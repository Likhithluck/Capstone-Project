import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AuthService } from '../auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { SInvoiceBody } from '../../Invoice';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-s-invoices',
  imports: [CommonModule, DataTablesModule, FormsModule],
  templateUrl: './s-invoices.component.html',
  styleUrls: ['./s-invoices.component.less']
})
export class SInvoicesComponent implements OnInit, OnDestroy  {

  isLoggedIn = false;
  parseurl!: string;
  
  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  oldEditingInvoice!: SInvoiceBody; // Track the currently editing invoice
  invoices: SInvoiceBody[] = [];
  errorMessage!: string;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>(); // Subject to trigger DataTable reinitialization
  private destroy$: Subject<void> = new Subject<void>(); // Subject to manage component destruction
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchInvoices();
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [10, 25, 50],
      language: {
        searchPlaceholder: 'Search'
      }
    };
  }

  fetchInvoices(): void {
    this.http.get<SInvoiceBody[]>('API_ENDPOINT_HERE') // Replace with actual API endpoint
      .subscribe(
        (data) => {
          this.invoices = data;
          this.dtTrigger.next(null);
        },
        (error) => {
          this.errorMessage = 'Error fetching invoices';
        }
      );
  }

  onEdit(invoice: SInvoiceBody) {
    invoice.isEditable = true; 
    const strObject = JSON.stringify(invoice); // Convert invoice to string
    const parsedObject = JSON.parse(strObject); // Parse the string back to an object
    this.oldEditingInvoice = parsedObject; // Set the currently editing invoice
  }

  onUpdate(invoice: SInvoiceBody) {
    // Update logic here
  }

  onCancel(invoice: SInvoiceBody) {
    // Logic to revert changes if needed
  }

  onDelete(invoice: SInvoiceBody) {
    // Delete logic here
  }

  login(): void {
    this.parseurl = this.router.url;
    this.router.navigate(['/login']);
  }
}
