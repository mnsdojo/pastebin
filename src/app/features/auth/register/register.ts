import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme';
import { AuthService } from '../../../core/services/auth';
import {
  LucideAngularModule,
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  error = signal<string>('');
  isLoading = signal<boolean>(false);
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  readonly UserPlus = UserPlus;
  constructor(
    public themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {}
  get themeConfig() {
    return this.themeService.themeConfig;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  readonly UserIcon = UserIcon;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Mail = Mail;
  readonly Lock = Lock;

  onSubmit() {
    this.error.set('');
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.username.length < 3) {
      this.error.set('Username must be at least 3 characters');
      return;
    }

    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);
    this.authService
      .register({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error.set(error.message || 'Registration failed. Please try again.');
          this.isLoading.set(false);
        },
      });
  }
}
