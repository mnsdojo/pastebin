import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="flex flex-col items-center gap-3">
        <div
          class="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="text-sm text-zinc-300">Loading...</p>
      </div>
    </div>
  `,
})
export class GlobalLoader {}
