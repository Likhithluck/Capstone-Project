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
  body: SInvoiceBody = {} as SInvoiceBody;
  
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
    this.http.get<SInvoiceBody[]>('http://127.0.0.1:8000/sinvoices') // Call the backend GET /sinvoices endpoint
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
      this.body.Invoice_Number= invoice.Invoice_Number;
      this.body.DateOfIssue=invoice.DateOfIssue;
      this.body.SName= invoice.SName;
      this.body.SAddress= invoice.SAddress;
      this.body.STaxId= invoice.STaxId;
      this.body.Cname= invoice.Cname;
      this.body.CAddress= invoice.CAddress;
      this.body.CTaxId= invoice.CTaxId;
      this.body.Networth= invoice.Networth;
      this.body.Grossworth= invoice.Grossworth;

      this.http.put<SInvoiceBody>(`http://127.0.0.1:8000/sinvoices/${invoice._id}`, this.body)
        .subscribe(
          (updatedInvoice) => {
            // Update the local invoices array with updated data
            const index = this.invoices.findIndex(inv => inv._id === updatedInvoice._id);
            if (index !== -1) {
              this.invoices[index] = updatedInvoice;
            }
            invoice.isEditable = false;
          },
          (error) => {
            this.errorMessage = 'Error updating invoice';
          }
        );
  }

  onCancel(invoice: SInvoiceBody) {
    
    invoice.Invoice_Number = this.oldEditingInvoice.Invoice_Number;
    invoice.DateOfIssue = this.oldEditingInvoice.DateOfIssue;
    invoice.SName = this.oldEditingInvoice.SName;
    invoice.SAddress = this.oldEditingInvoice.SAddress;
    invoice.STaxId = this.oldEditingInvoice.STaxId;
    invoice.Cname = this.oldEditingInvoice.Cname;
    invoice.CAddress = this.oldEditingInvoice.CAddress;
    invoice.CTaxId = this.oldEditingInvoice.CTaxId;
    invoice.Networth = this.oldEditingInvoice.Networth;
    invoice.Grossworth = this.oldEditingInvoice.Grossworth;
    invoice.isEditable = false;

  }

  onDelete(invoice: SInvoiceBody) {
    // Delete logic here
  }

  login(): void {
    this.parseurl = this.router.url;
    this.router.navigate(['/login']);
  }
}
