/**
 * Component for displaying the welcome page.
 * It shows the login and registration options to the user based on their login status.
 * 
 * @class WelcomePageComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /** Boolean indicating if the user is logged in. */
  isLoggedIn: boolean = false;

  /**
   * Creates an instance of WelcomePageComponent.
   * 
   * @param {MatDialog} dialog - Service for opening dialogs (login or registration).
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Lifecycle hook called when the component is initialized.
   * It checks if the user is logged in based on the presence of 'currentUser' in localStorage.
   */
  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('currentUser');  // Check if user is logged in
  }

  /**
   * Opens the user registration dialog for the user to register a new account.
   * 
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog for the user to log in to an existing account.
   * 
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
