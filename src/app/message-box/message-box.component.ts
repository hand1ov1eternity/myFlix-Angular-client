import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']  // Fixed here: 'styleUrl' → 'styleUrls'
})
export class MessageBoxComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA)
        public data: {
            title: string,
            content: string
        },
        public dialogRef: MatDialogRef<MessageBoxComponent>
    ) {}

    ngOnInit(): void {}

    closeMessageBox(): void {
        this.dialogRef.close();
    }
}
