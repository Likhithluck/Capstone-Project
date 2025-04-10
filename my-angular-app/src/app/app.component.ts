import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'my-angular-app';
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Non-null assertion operator
  @ViewChild(MatSort) sort!: MatSort;  // Non-null assertion operator

  constructor() {
    // Sample data for the table
    const users = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.81, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.011, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.007, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.999, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.998, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.180, symbol: 'Ne' }
    ];

    // Initialize data source with sample data
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    // Initialization logic if necessary on component load
  }

  ngAfterViewInit(): void {
    // After the view is initialized, set paginator and sorter
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
