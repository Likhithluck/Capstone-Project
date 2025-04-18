import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  imports: [CommonModule], // Removed unused imports
  standalone: true, 
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent {

}
