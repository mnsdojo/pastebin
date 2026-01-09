import { Component, signal } from '@angular/core';
import { CreatePasteInput, PasteVisibility } from '../../core/models/paste.model';
import { LucideAngularModule, Plus, FileText } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme';
import { PasteService } from '../../core/services/paste';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  title = '';
  content = '';
  visibility: PasteVisibility = 'public';
  expiry = 'never';
  isSubmitting = signal(false);
  error = signal<string>('');
  readonly Plus = Plus;
  readonly FileText = FileText;

  constructor(
    public themeService: ThemeService,
    private pasteService: PasteService,
    private router: Router
  ) {}

  onSubmit() {
    this.error.set('');

    // Validation
    if (!this.content.trim()) {
      this.error.set('Content is required');
      return;
    }

    this.isSubmitting.set(true);

    const pasteData: CreatePasteInput = {
      title: this.title || undefined,
      content: this.content,
      visibility: this.visibility ?? 'public',
      expiresAt: this.calculateExpiryDate(),
    };

    console.log('📤 Sending paste data:', pasteData); // Debug log

    this.pasteService.createPaste(pasteData).subscribe({
      next: (paste) => {
        console.log('✅ Paste created:', paste);
        this.isSubmitting.set(false);
        this.router.navigate(['/paste', paste.id]);
      },
      error: (error) => {
        console.error('❌ Failed to create paste:', error);
        console.error('❌ Error details:', error.error); // See backend error
        this.error.set(error.error?.message || error.message || 'Failed to create paste');
        this.isSubmitting.set(false);
      },
    });
  }

  get themeConfig() {
    return this.themeService.themeConfig;
  }
  private calculateExpiryDate(): string | null {
    if (this.expiry === 'never') return null;

    const now = new Date();
    let expiryDate: Date;

    switch (this.expiry) {
      case '1h':
        expiryDate = new Date(now.getTime() + 60 * 60 * 1000);
        break;
      case '1d':
        expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case '1w':
        expiryDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case '1m':
        expiryDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return null;
    }

    return expiryDate.toISOString(); // Convert to ISO string!
  }

  clear() {
    this.title = '';
    this.content = '';
    this.visibility = 'public';
    this.expiry = 'never';
    this.error.set('');
  }
}
