import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, FileText, Palette, LogOut, User as UserIcon } from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, LucideAngularModule, ThemeSelector],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  showThemeSelector = false;

  // Lucide icons
  readonly FileText = FileText;
  readonly Palette = Palette;
  readonly LogOut = LogOut;
  readonly UserIcon = UserIcon;

  constructor(public themeService: ThemeService, public authService: AuthService) {}
  // Access themeConfig as a getter instead
  get themeConfig() {
    return this.themeService.themeConfig;
  }

  toggleThemeSelector() {
    this.showThemeSelector = !this.showThemeSelector;
  }

  closeThemeSelector() {
    this.showThemeSelector = false;
  }
  logout() {
    this.authService.logout();
  }
}
