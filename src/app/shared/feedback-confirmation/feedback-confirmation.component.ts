import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-confirmation',
  standalone: true,
  templateUrl: './feedback-confirmation.component.html',
  styleUrl: './feedback-confirmation.component.css',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class FeedbackConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<FeedbackConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      action?: string;
      confirmText?: string;
      cancelText?: string;
    }
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
