import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-all-invoices',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.less']
})
export class AllInvoicesComponent {
  invoices = [
    {
      _id: 'INV123',
      customerName: 'John Doe',
      date: '2025-04-10',
      total: '$1,200.00',
      status: 'Paid'
    },  
  ];
 
}