/**
 * Component responsible for displaying movie cards.
 * It handles fetching movie data, displaying movie details, and managing user favorites.
 * 
 * @class MovieCardComponent
 */
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  /** Array of movies to be displayed */
  movies: any[] = [];
  
  /** Number of columns in the grid (adjusted based on screen size) */
  gridCols: number = 4;

  /**
   * Creates an instance of MovieCardComponent.
   * 
   * @param {UserRegistrationService} fetchApiData - Service for interacting with the movie API.
   * @param {Router} router - Router for navigation between pages.
   * @param {MatDialog} dialog - Dialog service for displaying movie information.
   * @param {BreakpointObserver} breakpointObserver - Observes screen size changes for responsive layouts.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  /**
   * Initializes the component by fetching movie data and setting up grid columns.
   * Called when the component is first initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.setGridCols();
  }

  /**
   * Fetches all movies from the API and processes them.
   * It also checks if the user has any favorite movies stored in localStorage.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(res => {
      this.movies = res;

      let user = localStorage.getItem('currentUser');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
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

  /**
   * Sets the number of columns in the movie grid based on the screen size.
   * The grid adjusts to one column on smaller screens (handset), two on tablets, and four on larger screens.
   */
  setGridCols(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Handset]) {
        this.gridCols = 1;
      } else if (result.breakpoints[Breakpoints.Tablet]) {
        this.gridCols = 2;
      } else {
        this.gridCols = 4;
      }
    });
  }

  /**
   * Logs out the current user and redirects to the welcome page.
   * Removes the user's data from localStorage.
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("currentUser");
  }

  /**
   * Redirects the user to the profile page.
   */
  redirectProfile(): void {
    this.router.navigate(["profile"]);
  }

  /**
   * Adds or removes a movie from the user's favorite movies list.
   * It updates the user data in localStorage and adjusts the favorite icon accordingly.
   * 
   * @param {any} movie - The movie to add or remove from favorites.
   */
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

  /**
   * Opens a dialog displaying the genre information of a movie.
   * 
   * @param {any} movie - The movie whose genre information will be displayed.
   */
  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: String(movie.genre.name).toUpperCase(),
        content: movie.genre.description
      },
      width: "400px"
    });
  }

  /**
   * Opens a dialog displaying the director information of a movie.
   * 
   * @param {any} movie - The movie whose director's information will be displayed.
   */
  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.director.name,
        content: movie.director.bio
      },
      width: "400px"
    });
  }

  /**
   * Opens a dialog displaying detailed information about a movie.
   * 
   * @param {any} movie - The movie whose detailed information will be displayed.
   */
  showDetail(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.title,
        content: movie.description
      },
      width: "400px"
    });
  }
}
