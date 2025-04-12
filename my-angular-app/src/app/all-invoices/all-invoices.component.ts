import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../../Invoice';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables'; // Importing DataTables module for Angular
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-all-invoices',
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.less']
})
export class AllInvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  errorMessage!: string;
  dtOptions: Config={}
  dtTrigger: Subject<any> = new Subject<any>(); // Subject to trigger DataTable reinitialization
  

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.fetchInvoices();
    this.dtOptions = {
      pagingType: 'full_numbers',
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
}



