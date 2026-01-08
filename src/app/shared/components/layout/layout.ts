import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(public themeService: ThemeService) {}

  getThemeClasses(): string {
    const config = this.themeService.themeConfig();
    return `${config.bg} ${config.text} min-h-screen flex flex-col transition-colors duration-200`;
  }
}
