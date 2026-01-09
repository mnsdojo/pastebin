import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-angular';

export type ConfirmationType = 'danger' | 'primary' | 'warning';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModal {
  @Input() isOpen = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() type: ConfirmationType = 'primary';

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  readonly X = X;
  readonly AlertTriangle = AlertTriangle;
  readonly AlertCircle = AlertCircle;
  readonly HelpCircle = HelpCircle;

  onConfirm() {
    this.confirm.emit();
  }

  onClose() {
    this.close.emit();
  }

  get icon() {
    switch (this.type) {
      case 'danger': return this.AlertTriangle;
      case 'warning': return this.AlertCircle;
      default: return this.HelpCircle;
    }
  }

  get confirmButtonClass() {
    switch (this.type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      case 'primary':
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
    }
  }
  
  get iconColorClass() {
      switch (this.type) {
      case 'danger':
        return 'text-red-500 bg-red-100';
      case 'warning':
        return 'text-yellow-500 bg-yellow-100';
      case 'primary':
      default:
        return 'text-indigo-500 bg-indigo-100';
    }
  }
}
