import { Component, signal, OnInit } from '@angular/core';
import { Paste } from '../../core/models/paste.model';
import {
  LucideAngularModule,
  FileText,
  Plus,
  Copy,
  Share2,
  Edit,
  Trash2,
  Lock,
  Globe,
  Link as LinkIcon,
  Clock,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { PasteService } from '../../core/services/paste';
import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-my-pastes',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './my-pastes.html',
  styleUrl: './my-pastes.css',
})
export class MyPastes implements OnInit {
  pastes = signal<Paste[]>([]);
  loading = signal(true);
  error = signal<string>('');
  deletingId = signal<string | null>(null);

  
  
  readonly FileText = FileText;
  readonly Plus = Plus;
  readonly Copy = Copy;
  readonly Share2 = Share2;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Lock = Lock;
  readonly Globe = Globe;
  readonly LinkIcon = LinkIcon;
  readonly Clock = Clock;

  constructor(
    public authService: AuthService,
    private pasteService: PasteService,
    public router: Router,
    public themeService: ThemeService,
  ) {}
  ngOnInit(): void {
    this.loadPastes();
  }
  get themeConfig() {
    return this.themeService.themeConfig;
  }

  loadPastes() {
    this.loading.set(true);
    this.error.set('');

    this.pasteService.getUserPastes().subscribe({
      next: (pastes) => {
        this.pastes.set(pastes);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message || 'Failed to load pastes');
        this.loading.set(false);
      },
    });
  }
  viewPaste(id: string) {
    this.router.navigate(['/paste', id]);
  }

  createNewPaste() {
    this.router.navigate(['/']);
  }

  getPreview(content: string) {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
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

  getVisibilityIcon(visibility: string) {
    switch (visibility) {
      case 'public':
        return this.Globe;
      case 'unlisted':
        return this.LinkIcon;
      case 'private':
        return this.Lock;
      default:
        return this.FileText;
    }
  }
  getVisibilityLabel(visibility: string) {
    switch (visibility) {
      case 'public':
        return 'Public';
      case 'unlisted':
        return 'Unlisted';
      case 'private':
        return 'Private';
      default:
        return visibility;
    }
  }
}
