import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
  imports: [],
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
