import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['./ad-search.component.less'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdSearchComponent {
  searchForm: FormGroup;
  searchResults: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      invoice_number: [''],
      bill_to: [''],
      ship_to: [''],
      ship_mode: [''],
      start_date: [''],
      end_date: [''],
      min_total: [''],
      max_total: ['']
    });
  }

  onSearch(): void {
    let params = new HttpParams();
    const formValue = this.searchForm.value;

    if (formValue.invoice_number) {
      params = params.set('invoice_number', formValue.invoice_number);
    }
    if (formValue.bill_to) {
      params = params.set('bill_to', formValue.bill_to);
    }
    if (formValue.ship_to) {
      params = params.set('ship_to', formValue.ship_to);
    }
    if (formValue.ship_mode) {
      params = params.set('ship_mode', formValue.ship_mode);
    }
    if (formValue.start_date) {
      params = params.set('start_date', formValue.start_date);
    }
    if (formValue.end_date) {
      params = params.set('end_date', formValue.end_date);
    }
    if (formValue.min_total) {
      params = params.set('min_total', formValue.min_total);
    }
    if (formValue.max_total) {
      params = params.set('max_total', formValue.max_total);
    }

    this.http.get<any[]>('http://localhost:8000/invoices/search', { params })
      .subscribe(
        (data) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error fetching search results:', error);
          this.searchResults = [];
        }
      );
  }

  onReset(): void {
    this.searchForm.reset();
    this.searchResults = [];
  }
}