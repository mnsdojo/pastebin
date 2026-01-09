import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Globe, Clock, FileText } from 'lucide-angular';
import { PasteService } from '../../core/services/paste';
import { Paste } from '../../core/models/paste.model';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore implements OnInit {
  pastes = signal<Paste[]>([]);
  loading = signal(true);
  error = signal<string>('');

  readonly Globe = Globe;
  readonly Clock = Clock;
  readonly FileText = FileText;

  constructor(
    private pasteService: PasteService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadPublicPastes();
  }
  
  get themeConfig() {
    return this.themeService.themeConfig;
  }

  loadPublicPastes() {
    this.loading.set(true);
    this.error.set('');

    this.pasteService.getPublicPastes().subscribe({
      next: (response) => {
        console.log(response);
        this.pastes.set(response.pastes);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message || 'Failed to load public pastes');
        this.loading.set(false);
      },
    });
  }

  viewPaste(id: string) {
    this.router.navigate(['/paste', id]);
  }

  getPreview(content: string) {
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString();
  }
}
