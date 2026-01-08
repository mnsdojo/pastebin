import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth';
import { CommonModule } from '@angular/common';
import { GlobalLoader } from "./shared/components/global-loader/global-loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GlobalLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.authService.initializeAuth();
  }
}
