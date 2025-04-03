/**
 * Component for handling the user registration form.
 * It allows the user to enter their details, which are then sent to the backend for registration.
 * The component also handles success and error notifications.
 * 
 * @class UserRegistrationFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import API service to handle registration
import { UserRegistrationService } from '../fetch-api-data.service';

// Import for displaying notifications
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /** The userData object holds the form fields for username, password, email, and birthday */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * 
   * @param {UserRegistrationService} fetchApiData - Service for sending registration data to the backend.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog to close it upon success.
   * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * No additional initialization required for this component.
   */
  ngOnInit(): void {}

  /**
   * Handles the user registration by sending the data to the backend API.
   * Displays a success message if the registration is successful, or an error message if it fails.
   * 
   * @returns {void}
   */
  registerUser(): void {
    // Log the user data being sent to the backend
    console.log('Sending user details:', this.userData);

    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful registration goes here!
        this.dialogRef.close(); // Close the modal on success
        console.log('Registration successful:', result); // Log the result here
        this.snackBar.open('Registration Successful', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        // Log error details
        console.error('Registration error:', error);
        const errorMessage = error.error?.message || 'Registration Failed';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
