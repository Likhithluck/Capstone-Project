import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent {
  fileName: string = 'No file chosen';
  uploadSuccess: boolean = false;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    } else {
      this.fileName = 'No file chosen';
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.fileName !== 'No file chosen') {
      // Simulate upload process with steps
      const steps = document.querySelectorAll('.step-container');
      if (steps.length >= 3) {
        steps[0].classList.remove('active');
        steps[1].classList.add('active');

        setTimeout(() => {
          steps[1].classList.remove('active');
          steps[2].classList.add('active');

          setTimeout(() => {
            this.uploadSuccess = true;
            const form = (event.target as HTMLFormElement);
            form.style.display = 'none';
          }, 1500);
        }, 1500);
      } else {
        this.uploadSuccess = true;
        const form = (event.target as HTMLFormElement);
        form.style.display = 'none';
      }
    } else {
      alert('Please select a file to upload.');
    }
  }
}
