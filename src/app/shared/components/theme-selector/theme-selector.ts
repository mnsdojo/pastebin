import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';

import { LucideAngularModule, X, Check, Palette, Moon, Sun } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ThemeName } from '../../../core/models/theme.model';

@Component({
  selector: 'app-theme-selector',
  imports: [LucideAngularModule, CommonModule],
  standalone: true,
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.css',
})
export class ThemeSelector {
  @Output() close = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}
  get themesList() {
    return this.themeService.getThemesList();
  }
  readonly X = X;
  readonly Check = Check;
  readonly Palette = Palette;
  readonly Moon = Moon;
  readonly Sun = Sun;
  get themeConfig() {
    return this.themeService.themeConfig;
  }

  selectTheme(theme: ThemeName) {
    this.themeService.setTheme(theme);
    this.close.emit();
  }
  onBackDropClick() {
    this.close.emit();
  }
  onModalClick(event: Event) {
    event.stopPropagation();
  }

  get currentTheme() {
    return this.themeService.currentTheme;
  }
  getIcon(themeName: string) {
    return themeName === 'light' || themeName === 'sunset' ? this.Sun : this.Moon;
  }
}
