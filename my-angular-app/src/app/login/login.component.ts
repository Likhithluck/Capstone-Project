import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';
  private returnUrl: string = '/';

  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject the AuthService if needed
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.loginError = '';
      alert('Login successful!');
      const navigation = this.router.getCurrentNavigation();
      this.returnUrl = navigation?.extras?.state?.['returnUrl'] || '/';
      this.router.navigateByUrl(this.returnUrl); // Redirect to homepage
    } else {
      this.loginError = 'Invalid username or password';
    }
    }

  }
