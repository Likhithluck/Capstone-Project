import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [CommonModule,RouterOutlet], // Removed unused imports
  standalone: true, 
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less'] // Corrected property name
})
export class HomepageComponent {
  constructor(private router: Router) {}  // Inject Router service

  ngOnInit(): void {
    this.addSidebarEventListener();
  }

  // Add event listener for menu toggle
  addSidebarEventListener() {
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
      burgerMenu.addEventListener('click', this.toggleMenu.bind(this)); // Bind 'this' context
    }
  }

  // Function to open the sidebar
  toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.width = '350px'; // Adjust width as needed
    }
  }

  // Function to close the sidebar
  closeMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.width = '0'; // Close the sidebar
    }
  }

  // Function to navigate programmatically
  navigateToAllInvoices() {
    this.router.navigate(['/allInvoices']);  // Navigate to 'all-invoices' route
  }
}