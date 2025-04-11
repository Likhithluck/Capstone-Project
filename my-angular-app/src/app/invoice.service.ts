import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://127.0.0.1:8000/invoices'; // Replace with your FastAPI endpoint

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}