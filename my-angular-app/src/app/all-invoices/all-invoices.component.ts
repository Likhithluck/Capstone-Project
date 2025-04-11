import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../../Invoice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-all-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.less']
})
export class AllInvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  errorMessage!: string;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data; // Assign fetched data to 'invoices'
        this.errorMessage = ''; // Reset error message on successful fetch
      },
      error: (err) => {
        console.error('Error fetching invoices:', err); // Log error details to console
        this.errorMessage = 'Something went wrong; please try again later.'; // Set user-friendly error message
      }
    });
  }
}



