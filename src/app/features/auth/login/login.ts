import { Component, signal } from '@angular/core';
import { LucideAngularModule, LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPassword = signal<boolean>(false);

  error = signal<string>('');
  isLoading = signal<boolean>(false);
  returnUrl: string = '/';

  readonly LogIn = LogIn;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Mail = Mail;
  readonly Lock = Lock;

  constructor(
    public themeService: ThemeService,
    private router: Router,

    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get themeConfig() {
    return this.themeService.themeConfig;
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    this.error.set('');

    if (!this.email || !this.password) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error.set('Please enter a valid email address');
      return;
    }

    if (this.email.length < 5 || this.email.length > 255) {
      this.error.set('Email must be between 5 and 255 characters');
      return;
    }

    if (this.password.length < 8) {
      this.error.set('Password must be at least 8 characters long');
      return;
    }

    if (this.password.length > 128) {
      this.error.set('Password must be less than 128 characters');
      return;
    }
    this.isLoading.set(true);

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.error.set(error.message || 'Invalid email or password');
          this.isLoading.set(false);
        },
      });
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
