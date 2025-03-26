import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const username = localStorage.getItem('currentUser') 
    if (username) {

        this.fetchApiData.getUser(JSON.parse(username).username).subscribe((response: any) => {
            this.user = response;
        });
    }
}

  updateProfile(): void {
    this.fetchApiData.editUser(this.user.username, this.user).subscribe(
      (result) => {
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      this.snackBar.open('Error updating profile', 'OK', {
        duration: 2000
      });
      console.error(error);
    });
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
