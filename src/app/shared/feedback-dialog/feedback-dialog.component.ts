import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class FeedbackDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; action?: string }
  ) {}

  close(): void {
    this.dialogRef.close(true);
  }
}
