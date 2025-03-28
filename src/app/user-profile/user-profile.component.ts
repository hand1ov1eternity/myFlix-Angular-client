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
  user: any = {};

  constructor(
    private fetchApiData: UserRegistrationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.fetchApiData.getUser(parsedUser.username).subscribe((response: any) => {
        this.user = response || {};
        this.user.favoriteMovies = this.user.favoriteMovies || [];
        this.fetchApiData.getAllMovies().subscribe((allMovies: any) => {
          // Filter favorite movies
          this.user.favoriteMovies = allMovies.filter((movie: any) =>
            this.user.favoriteMovies.includes(movie._id)
          );
        });
      }, error => {
        console.error('Error fetching user profile', error);
      });
    }
  }
  

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

get birthday(): string {
  return this.user?.birthday ? this.user.birthday.split('T')[0] : ''; // Format to 'yyyy-MM-dd'
}

set birthday(value: string) {
  if (this.user) {
    this.user.birthday = value; // Set the formatted value back to user.birthday
  }
}

deleteAccount(): void {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    this.fetchApiData.deleteUser(this.user?.username).subscribe(() => {
      // Clear all local storage items to log out the user completely
      localStorage.clear();
      console.log('LocalStorage after clearing:', localStorage); // Verify if local storage is cleared

      // Show success message
      this.snackBar.open('Account deleted', 'OK', {
        duration: 2000
      });

      // Redirect to the signup page (or welcome page)
      this.router.navigate(['welcome']).then(() => {
        console.log('Redirected to welcome page');
      });

    }, error => {
      this.snackBar.open('Error deleting account', 'OK', {
        duration: 2000
      });
      console.error(error);
    });
  }
}

}
