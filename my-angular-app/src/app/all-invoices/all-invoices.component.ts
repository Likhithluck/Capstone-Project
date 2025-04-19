import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice, InvoiceBody } from '../../Invoice';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables'; // Importing DataTables module for Angular
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-invoices',
  standalone: true,
  imports: [CommonModule, DataTablesModule, FormsModule],
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.less']
})
export class AllInvoicesComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  parseurl!: string;
  
  constructor(
    private http: HttpClient, 
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  private body: InvoiceBody = {
    "_id": '',
    "Invoice Number": '',
    "Date": '',
    "Bill To": '',
    "Ship To": '',
    "Items": [],
    "Ship Mode": '',
    "Balance Due": 0,
    "Subtotal": 0,
    "Discount": 0,
    "Shipping": 0,
    "Total": 0,
    "Notes": '',
    "Order ID": ''
  }; 

  oldEditingInvoice!: Invoice; // Track the currently editing invoice
  invoices: Invoice[] = [];
  errorMessage!: string;
  dtOptions: Config={}
  dtTrigger: Subject<any> = new Subject<any>(); // Subject to trigger DataTable reinitialization
  private destroy$: Subject<void> = new Subject<void>(); // Subject to manage component destruction
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchInvoices();
    this.body;
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [10, 25, 50],
      language: {
        searchPlaceholder: 'Search'}
    }
  }

  fetchInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        console.log(this.invoices); // Assign fetched data to 'invoices'
        this.errorMessage = ''; // Reset error message on successful fetch
        this.dtTrigger.next(null); // Trigger DataTable reinitialization after data fetch
      },
      error: (err) => {
        console.error('Error fetching invoices:', err); // Log error details to console
        this.errorMessage = 'Something went wrong; please try again later.'; // Set user-friendly error message
      }
    });
  }

  onEdit(invoice: Invoice){
    invoice.isEditable = true; 
    const strObject = JSON.stringify(invoice); // Convert invoice to string
    const parsedObject = JSON.parse(strObject); // Parse the string back to an object
    this.oldEditingInvoice = parsedObject; // Set the currently editing invoice
  }

  onUpdate(invoice: Invoice)
  {
    this.body = {
      "_id": invoice.id,
      "Invoice Number": invoice.invoice_number,
      "Date": invoice.date,
      "Bill To": invoice.bill_to,
      "Ship To": invoice.ship_to || '',
      "Ship Mode": invoice.ship_mode,
      "Total": invoice.total,
      "Balance Due": invoice.balance_due,
      "Shipping": invoice.shipping,
      "Discount": invoice.discount || 0,
      "Subtotal": invoice.subtotal,
      "Notes": invoice.notes || '',
      "Order ID": invoice.order_id || '',
      "Items": invoice.items.map(item => ({
        "Item Name": item.item_name,
        "Quantity": item.quantity,
        "Unit Price": item.unit_price,
        "Total Price": item.total_price
      }))
    };

    this.http.put(`http://127.0.0.1:8000/invoices/${this.body._id}`, this.body, { observe: 'response' })
    .subscribe(
      (response) => {
        const status = response.status;
  
        if (status === 200 || status === 204) {
          alert('Invoice updated successfully!');
          invoice.isEditable = false; 
        } else {
          this.errorMessage = `Unexpected response: ${status}`;
        }
      },
      (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Invoice not found';
        } else {
          this.errorMessage = 'Error updating invoice';
        }
      }
    );
}


  onCancel(invoice: Invoice) {
    invoice.isEditable = false;
    
      invoice.invoice_number = this.oldEditingInvoice.invoice_number; 
      invoice.date = this.oldEditingInvoice.date;
      invoice.bill_to = this.oldEditingInvoice.bill_to;
      invoice.ship_to = this.oldEditingInvoice.ship_to;
      invoice.ship_mode = this.oldEditingInvoice.ship_mode;
      invoice.balance_due = this.oldEditingInvoice.balance_due;
      invoice.items = this.oldEditingInvoice.items;
      invoice.subtotal = this.oldEditingInvoice.subtotal;
      invoice.discount = this.oldEditingInvoice.discount;
      invoice.shipping = this.oldEditingInvoice.shipping;
      invoice.total = this.oldEditingInvoice.total;
      invoice.notes = this.oldEditingInvoice.notes;

    
    // Here you can add logic to revert changes if needed
  }


  onDelete(invoice: Invoice) {
    if (!confirm(`Are you sure you want to delete invoice ${invoice.id}?`)) {
      return; // Exit if user cancels the deletion
    }
    this.invoiceService.delete(invoice.id).subscribe(() => {
      this.invoices = this.invoices.filter(existingInvoice => existingInvoice.id !== invoice.id); // Update the UI
      alert('Invoice deleted successfully');
  }, error => {
      alert('Error deleting invoice: ' + error.error.detail);
  });

  }

  login(): void {
    this.parseurl = this.router.url;
    this.router.navigate(['/login']);
  }


}
