import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: "angular-app" = "angular-app";constructor(private router: Router,public authService: AuthService) {}  // Inject Router service
  
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

    navigateToSInvoices() {
      this.router.navigate(['/sInvoice']);  // Navigate to 's-invoices' route
    }
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/home']); 
    }
  
    login(): void {
      this.router.navigate(['/login']); 
    }

    navigattHome(): void {
      this.router.navigate(['/home']); 
    }
    navigateUpload(): void{
      this.router.navigate(['/upload'])
    }  
    navigatetoSearch(): void{
      this.router.navigate(['/search'])
    }
  }
  

