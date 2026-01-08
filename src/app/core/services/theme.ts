import { effect, Injectable, signal } from '@angular/core';
import { ThemeConfig, ThemeName, THEMES } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  currentTheme = signal<ThemeName>('dark');
  themeConfig = signal<ThemeConfig>(THEMES.dark);

  constructor() {
    this.loadTheme();

    effect(() => {
      const theme = this.currentTheme();
      this.themeConfig.set(THEMES[theme]);
    });
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeName;
    if (savedTheme && THEMES[savedTheme]) {
      this.currentTheme.set(savedTheme);
    }
  }

  setTheme(theme: ThemeName) {
    this.currentTheme.set(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  getThemes() {
    return THEMES;
  }

  getThemesList(): Array<{ key: ThemeName; config: ThemeConfig }> {
    return Object.entries(THEMES).map(([key, config]) => ({
      key: key as ThemeName,
      config,
    }));
  }
}
