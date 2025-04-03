/**
 * Component for the user login form.
 * It handles the user login process, displaying success or error messages, and routing the user upon successful login.
 * 
 * @class UserLoginFormComponent
 */
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

  /** Object containing the user's login credentials */
  @Input() userData = { username: '', password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * 
   * @param {UserRegistrationService} fetchApiData - Service for making API calls for user registration and login.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Dialog reference to close the modal on successful login.
   * @param {MatSnackBar} snackBar - SnackBar service to display login success/error messages.
   * @param {Router} router - Router for navigating to the movie list page after successful login.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * Currently, this method does nothing as initialization logic is handled within other methods.
   */
  ngOnInit(): void {}

  /**
   * Handles the login process by calling the login API and handling the response.
   * 
   * On successful login:
   * - Closes the dialog window.
   * - Saves the login token and user data to localStorage.
   * - Displays a success message.
   * - Navigates to the movie list page.
   * 
   * On failed login:
   * - Displays an error message using SnackBar.
   */
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

        // Display success notification
        this.snackBar.open('Login Successful', 'OK', {
          duration: 2000,
        });

        // Redirect to the movies page after login
        this.router.navigate(['movies']);
      },
      (error) => {
        console.error('Login error:', error);
        const errorMessage = error.error?.message || 'Login Failed';

        // Display error notification
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
