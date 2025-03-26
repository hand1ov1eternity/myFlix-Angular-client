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
  user: any = {
    username: '',
    email: '',
    birthday: ''
  };

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
            this.user = response;
            if (!Array.isArray(this.user.favoriteMovies)) {
                this.user.favoriteMovies = [];
            }
        });
    }
}


updateProfile(): void {
  this.fetchApiData.editUser(this.user.username, this.user).subscribe(
      (result) => {
          result.favoriteMovies = this.user.favoriteMovies || [];
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


  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.username).subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account deleted', 'OK', {
          duration: 2000
        });
      });
    }
  }
}
