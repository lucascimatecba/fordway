import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
template: `
    <div class="d-flex justify-content-between gap-3">
      <button *ngIf="canGoBack" class="btn btn-outline-secondary flex-fill" (click)="back.emit()">Anterior</button>
      <button class="btn btn-primary flex-fill" (click)="next.emit()">Próxima</button>
    </div>
  `
})
export class QuizNavigationComponent {
  @Input() canGoBack = false;
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
