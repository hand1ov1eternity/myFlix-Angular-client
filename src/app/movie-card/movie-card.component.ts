import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];

    constructor(
        public fetchApiData: UserRegistrationService,
        public router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe(res => {
            this.movies = res;
    
            let user = localStorage.getItem('currentUser');
if (user) {
  try {
    const parsedUser = JSON.parse(user);
    // Ensure user has favoriteMovies property
    if (parsedUser && Array.isArray(parsedUser.favoriteMovies)) {
      console.log(parsedUser.favoriteMovies);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
} else {
  console.log('User not found in localStorage');
}
            return this.movies;
        }, err => {
            console.error(err);
        });
    }

    logout(): void {
        this.router.navigate(["welcome"]);
        localStorage.removeItem("currentUser");
    }

    redirectProfile(): void {
        this.router.navigate(["profile"]);
    }

    modifyFavoriteMovies(movie: any): void {
        let storedUser = localStorage.getItem("currentUser");
        let user = storedUser ? JSON.parse(storedUser) : { username: "", favoriteMovies: [] };
    
        if (!Array.isArray(user.favoriteMovies)) {
            user.favoriteMovies = [];
        }
    
        let icon = document.getElementById(`${movie._id}-favorite-icon`);
    
        if (user.favoriteMovies.includes(movie._id)) {
            this.fetchApiData.removeFavoriteMovie(user.username, movie._id).subscribe(res => {
                icon?.setAttribute("fontIcon", "favorite_border");
                console.log("Movie removed from favorites");
                user.favoriteMovies = res.favoriteMovies || [];
                localStorage.setItem("currentUser", JSON.stringify(user));
            }, err => {
                console.error(err);
            });
        } else {
            this.fetchApiData.addFavoriteMovie(user.username, movie._id).subscribe(res => {
                icon?.setAttribute("fontIcon", "favorite");
                console.log("Movie added to favorites");
                user.favoriteMovies = res.favoriteMovies || [];
                localStorage.setItem("currentUser", JSON.stringify(user));
            }, err => {
                console.error(err);
            });
        }
    }
    
    

    showGenre(movie: any): void {
        this.dialog.open(MessageBoxComponent, {
            data: {
                title: String(movie.genre.name).toUpperCase(),
                content: movie.genre.description
            },
            width: "400px"
        })
    }

    showDirector(movie: any): void {
        this.dialog.open(MessageBoxComponent, {
            data: {
                title: movie.director.name,
                content: movie.director.bio
            },
            width: "400px"
        })
    }

    showDetail(movie: any): void {
        this.dialog.open(MessageBoxComponent, {
            data: {
                title: movie.title,
                content: movie.description
            },
            width: "400px"
        })
    }
}
