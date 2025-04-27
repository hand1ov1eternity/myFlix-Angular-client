/**
 * Component for displaying and updating the user's profile information.
 * It allows the user to view and modify their profile, update their favorite movies, and delete their account.
 * 
 * @class UserProfileComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /** The user object that holds the user's profile data */
  user: any = {};

  /** Boolean to manage the delete loading state */
  isDeleting: boolean = false;

  /**
   * Creates an instance of UserProfileComponent.
   * 
   * @param {UserRegistrationService} fetchApiData - Service to fetch user data and perform updates or deletions.
   * @param {MatSnackBar} snackBar - Service for displaying notifications to the user.
   * @param {Router} router - Router service to navigate between views.
   * @param {Location} location - Location service for navigating back to the previous page.
   */
  constructor(
    private fetchApiData: UserRegistrationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  /**
   * Navigates the user back to the previous page.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Lifecycle hook called when the component is initialized.
   * It fetches the user profile data.
   */
  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Fetches the current user's profile from the API and updates the `user` object.
   * It also retrieves the list of favorite movies and filters them based on the user's favorites.
   */
  getUserProfile(): void {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.fetchApiData.getUser(parsedUser.username).subscribe((response: any) => {
        console.log('User API response:', response); // keep for debugging
  
        // Set user directly
        this.user = response || {};
  
        // Make sure favoriteMovies array exists
        this.user.favoriteMovies = this.user.favoriteMovies || [];
  
      }, error => {
        console.error('Error fetching user profile', error);
      });
    }
  }

  /**
   * Updates the user's profile by calling the API to save the changes.
   * It also updates the user information in localStorage and shows a notification.
   */
  updateProfile(): void {
    this.fetchApiData.editUser(this.user?.username, this.user).subscribe(
      (result) => {
        result.favoriteMovies = this.user?.favoriteMovies || [];
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000
        });
      }, (error) => {
        this.snackBar.open('Error updating profile', 'OK', {
          duration: 2000
        });
        console.error(error);
      }
    );
  }

  /**
   * Getter for the user's birthday. It formats the date to 'yyyy-MM-dd' format.
   * 
   * @returns {string} The formatted birthday of the user.
   */
  get birthday(): string {
    return this.user?.birthday ? this.user.birthday.split('T')[0] : ''; // Format to 'yyyy-MM-dd'
  }

  /**
   * Setter for the user's birthday.
   * 
   * @param {string} value - The formatted birthday string to set to the user's birthday.
   */
  set birthday(value: string) {
    if (this.user) {
      this.user.birthday = value; // Set the formatted value back to user.birthday
    }
  }

  /**
   * Deletes the user's account by calling the delete API and clearing local storage.
   * After successful deletion, the user is redirected to the welcome page.
   * 
   * @returns {void}
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.isDeleting = true; // Start loading spinner or "Deleting..." state
      this.fetchApiData.deleteUser(this.user?.username).subscribe({
        next: () => {
          localStorage.clear();
          this.snackBar.open('Account deleted successfully!', 'OK', { duration: 2000 });
          this.router.navigate(['/welcome']).then(() => {
            console.log('Redirected to welcome page');
            this.isDeleting = false;
          });
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('Error deleting account', 'OK', { duration: 2000 });
          this.isDeleting = false; // Stop loading even if error
        }
      });
    }
  }
  
}
