import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // For closing the dialog on success
import { UserRegistrationService } from '../fetch-api-data.service'; // API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // Display notifications
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {}

  // This function handles the login
  loginUser(): void {
    console.log('Logging in with user details:', this.userData);

    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful login goes here!
        this.dialogRef.close(); // Close the modal on success
        console.log('Login successful:', result);
        
        // Save the token and user to localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('currentUser', JSON.stringify(result.user));

        this.snackBar.open('Login Successful', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['movies']);
      },
      (error) => {
        console.error('Login error:', error);
        const errorMessage = error.error?.message || 'Login Failed';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
