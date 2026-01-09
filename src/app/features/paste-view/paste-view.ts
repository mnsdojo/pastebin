import { Component, signal, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, Clock, Globe, FileText, User, Copy, Check, Clipboard, Share2, Calendar } from 'lucide-angular';
import { PasteService } from '../../core/services/paste';
import { Paste } from '../../core/models/paste.model';
import { ThemeService } from '../../core/services/theme';
import hljs from 'highlight.js';

@Component({
  selector: 'app-paste-view',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './paste-view.html',
  styleUrl: './paste-view.css',
  encapsulation: ViewEncapsulation.None,
})
export class PasteView implements OnInit {
  paste = signal<Paste | null>(null);
  loading = signal(true);
  error = signal<string>('');
  isCopied = signal(false);
  isLinkCopied = signal(false);
  
  @ViewChild('codeBlock') codeBlock!: ElementRef;

  readonly Clock = Clock;
  readonly Globe = Globe;
  readonly FileText = FileText;
  readonly User = User;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly Clipboard = Clipboard;
  readonly Share2 = Share2;
  readonly Calendar = Calendar;

  constructor(
    private route: ActivatedRoute,
    private pasteService: PasteService,
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    effect(() => {
      const p = this.paste();
      const l = this.loading();
      
      if (p && !l && isPlatformBrowser(this.platformId)) {
        // give angular a tick to render the view
        setTimeout(() => {
          if (this.codeBlock) {
             console.log('Highlighting code block...');
             hljs.highlightElement(this.codeBlock.nativeElement);
          }
        });
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPaste(id);
      }
    });
  }

  get themeConfig() {
    return this.themeService.themeConfig;
  }

  loadPaste(id: string) {
    this.loading.set(true);
    this.error.set('');

    this.pasteService.getPasteById(id).subscribe({
      next: (paste) => {
        this.paste.set(paste);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load paste');
        this.loading.set(false);
      }
    });
  }

  copyToClipboard() {
    const content = this.paste()?.content;
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  }

  shareLink() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.isLinkCopied.set(true);
        setTimeout(() => this.isLinkCopied.set(false), 2000);
      }).catch(err => {
        console.error('Failed to copy link: ', err);
      });
    }
  }

  formatDate(date: Date | string | undefined | null): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
