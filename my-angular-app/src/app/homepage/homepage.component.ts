import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  imports: [CommonModule,RouterOutlet], // Removed unused imports
  standalone: true, 
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less'] // Corrected property name
})
export class HomepageComponent {
  
}