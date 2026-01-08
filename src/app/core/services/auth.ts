import { Injectable, signal } from '@angular/core';
import { LoginCredentials, RegisterCredentials, User } from '../models/user.model';
import { environment } from '../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

export type CommonAuthResponse = {
  user: User;
  token: string;
};
export type LoginReturnType = CommonAuthResponse;
export type RegisterReturnType = CommonAuthResponse;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly TOKEN_KEY = 'token';

  user = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);
  loading = signal<boolean>(true);

  constructor(private http: HttpClient, private router: Router) {
    console.log('🏗️ AuthService constructor called');
    console.log('🔑 Current token in localStorage:', localStorage.getItem('token'));
    console.log('🔑 All localStorage keys:', Object.keys(localStorage));
  }

  initializeAuth() {
    this.initAuth();
  }

  private initAuth() {
  const token = this.getToken();

  if (!token) {
    this.loading.set(false);
    return;
  }

  this.getCurrentUser().subscribe({
    next: (user) => {
      this.user.set(user);
      this.isAuthenticated.set(true);
      this.loading.set(false);
    },
    error: (error) => {
      if (error.status === 401) {
        this.clearAuth();
      }
      this.loading.set(false);
    },
  });
}
  login(credentials: LoginCredentials): Observable<LoginReturnType> {
    return this.http.post<LoginReturnType>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.user.set(response.user);
        this.isAuthenticated.set(true);
      }),
      catchError(this.handleError)
    );
  }

  register(credentials: RegisterCredentials): Observable<RegisterReturnType> {
    return this.http.post<RegisterReturnType>(`${this.apiUrl}/register`, credentials).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.user.set(response.user);
        this.isAuthenticated.set(true);
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(catchError(this.handleError));
  }

  logout() {
    this.clearAuth();
    this.router.navigate(['/auth/login']);
  }

  private clearAuth() {
    this.removeToken();
    this.user.set(null);
    this.isAuthenticated.set(false);
  }

  // Token management (only store token, not user data)
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      return token;
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      console.log('⚠️ Window is undefined');
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error: ${error.status}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
