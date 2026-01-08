import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  constructor(public themeService: ThemeService) {}
  get themeConfig() {
    return this.themeService.themeConfig;
  }
}
