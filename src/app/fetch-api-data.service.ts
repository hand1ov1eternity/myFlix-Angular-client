import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// Replace with your actual API URL
const apiUrl = 'https://movie-api-bqfe.onrender.com';

/**
 * Service responsible for making HTTP requests related to user registration, login, movies, and favorites.
 * It communicates with the backend API for various operations such as user authentication, getting movie details,
 * adding/removing favorite movies, and updating user information.
 */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user with the provided user details.
   * 
   * @param userDetails - The details of the user to be registered.
   * @returns An observable of the registration response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('Sending user details:', userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(  
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Logs a user in with the provided login details.
   * 
   * @param userDetails - The login details of the user.
   * @returns An observable of the login response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log('Sending login details:', userDetails);
    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      tap((response: any) => {
        // Check if a token is returned and save it to localStorage
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Save the token in localStorage
        }
      }),
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Retrieves a list of all movies.
   * 
   * @returns An observable of the movie list.
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}/movies`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Retrieves a movie by its title.
   * 
   * @param title - The title of the movie to be retrieved.
   * @returns An observable of the movie details.
   */
  public getOneMovie(title: string): Observable<any> {
    return this.http.get(`${apiUrl}/movies/${title}`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Retrieves a director by their name.
   * 
   * @param name - The name of the director to be retrieved.
   * @returns An observable of the director details.
   */
  public getDirector(name: string): Observable<any> {
    return this.http.get(`${apiUrl}/directors/${name}`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Retrieves a genre by its name.
   * 
   * @param name - The name of the genre to be retrieved.
   * @returns An observable of the genre details.
   */
  public getGenre(name: string): Observable<any> {
    return this.http.get(`${apiUrl}/genres/${name}`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Retrieves a user's favorite movies by their username.
   * 
   * @param username - The username of the user whose favorite movies are to be retrieved.
   * @returns An observable of the user's favorite movies.
   */
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${username}/movies`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Adds a movie to a user's list of favorite movies.
   * 
   * @param username - The username of the user adding the movie to their favorites.
   * @param movieId - The ID of the movie to be added to the favorites.
   * @returns An observable of the updated list of favorite movies.
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${apiUrl}/users/${username}/movies/${movieId}`, {}, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Retrieves a user's information by their username.
   * 
   * @param username - The username of the user whose details are to be retrieved.
   * @returns An observable of the user's details.
   */
  public getUser(username: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${username}`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Edits a user's details.
   * 
   * @param username - The username of the user whose details are to be updated.
   * @param updatedUser - The updated user details.
   * @returns An observable of the updated user details.
   */
  public editUser(username: string, updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Authorization Token:', token);  // Log the token to the console
  
    return this.http.put(`${apiUrl}/users/${username}`, updatedUser, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`  // Ensure the token is passed
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Deletes a user by their username.
   * 
   * @param username - The username of the user to be deleted.
   * @returns An observable confirming the deletion of the user.
   */
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${username}`, this.getHeaders()).pipe(
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Removes a movie from a user's favorite movies.
   * 
   * @param username - The username of the user removing the movie from their favorites.
   * @param movieId - The ID of the movie to be removed from the favorites.
   * @returns An observable of the updated list of favorite movies.
   */
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${username}/movies/${movieId}`, this.getHeaders()).pipe(
      map(this.extractResponseData), // Extract response data from the HTTP response
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Helper method to get HTTP headers with Authorization token.
   * 
   * @returns The headers containing the Authorization token.
   */
  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  /**
   * Helper method to extract response data from the API response.
   * 
   * @param res - The HTTP response.
   * @returns The extracted response data.
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Helper method to handle errors from the API requests.
   * 
   * @param error - The error response.
   * @returns A thrown error to propagate to the caller.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
