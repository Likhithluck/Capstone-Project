import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  imports: [CommonModule], // Removed unused imports
  standalone: true, 
  selector: 'app-homepage',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.less'
})
export class UploadComponent {

}
