import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  code: string = '';
  error: string = '';
  loading: boolean = false;
  correctCode: string = 'FDS@melek@manar281219';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if already logged in
    if (sessionStorage.getItem('auth_token')) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.error = '';
    this.loading = true;

    if (!this.code.trim()) {
      this.error = 'الرجاء إدخال الرمز';
      this.loading = false;
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      if (this.code === this.correctCode) {
        // Store auth token in sessionStorage
        sessionStorage.setItem('auth_token', 'authenticated');
        this.loading = false;
        this.router.navigate(['/']);
      } else {
        this.error = 'الرمز غير صحيح';
        this.code = '';
        this.loading = false;
      }
    }, 500);
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
