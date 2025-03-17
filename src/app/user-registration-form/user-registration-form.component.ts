import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
  // Log the user data being sent to the backend
  console.log('Sending user details:', this.userData);

  this.fetchApiData.userRegistration(this.userData).subscribe(
    (result) => {
      // Logic for a successful user registration goes here!
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
