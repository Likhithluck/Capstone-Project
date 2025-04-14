import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  private currentUser: string | null = null;

  private readonly mockUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'demo', password: 'demo123' }
  ];

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (!username || !password) {
        return false;
      }
  
      const user = this.mockUsers.find(u => 
        u.username === username && u.password === password
      );
  
      if (user) {
        this.isAuthenticated = true;
        this.currentUser = username;
        return true;
      }
      
      return false;
    }


  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/homepage']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}