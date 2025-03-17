import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Replace with your actual API URL
const apiUrl = 'https://movie-api-bqfe.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log('Sending user details:', userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(  
      catchError(this.handleError)
    );
  }

  // User Login
  public userLogin(userDetails: any): Observable<any> {
    console.log('Sending login details:', userDetails);
    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}movies`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie by title
  public getOneMovie(title: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/${title}`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director by name
  public getDirector(name: string): Observable<any> {
    return this.http.get(`${apiUrl}directors/${name}`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre by name
  public getGenre(name: string): Observable<any> {
    return this.http.get(`${apiUrl}genres/${name}`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user by username
  public getUser(username: string): Observable<any> {
    return this.http.get(`${apiUrl}users/${username}`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favorite movies of a user
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${apiUrl}users/${username}/movies`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, {}, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user details
  public editUser(username: string, updatedUser: any): Observable<any> {
    return this.http.put(`${apiUrl}users/${username}`, updatedUser, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${username}`, this.getHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Remove a movie from favorite movies
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, this.getHeaders()).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Helper: Get HTTP headers with Authorization token
  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // Helper: Extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }

  // Helper: Handle errors
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
