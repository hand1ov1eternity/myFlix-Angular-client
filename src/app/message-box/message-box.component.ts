/**
 * Component responsible for displaying a message box with a title and content.
 * This component is used in a dialog to display a simple message to the user.
 * 
 * @class MessageBoxComponent
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],  // Fixed here: 'styleUrl' → 'styleUrls'
})
export class MessageBoxComponent implements OnInit {
  /**
   * Creates an instance of the MessageBoxComponent.
   * 
   * @param {MAT_DIALOG_DATA} data - The data passed to the dialog, which contains the message's title and content.
   * @param {MatDialogRef<MessageBoxComponent>} dialogRef - A reference to the dialog used to control its lifecycle.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    },
    public dialogRef: MatDialogRef<MessageBoxComponent>
  ) {}

  /**
   * Initializes the component. This method is called after the component's 
   * constructor and is part of Angular's lifecycle hooks. 
   */
  ngOnInit(): void {}

  /**
   * Closes the message box dialog.
   * This method is called when the user closes the message box.
   */
  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
