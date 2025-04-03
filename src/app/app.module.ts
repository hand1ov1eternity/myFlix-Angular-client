import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessageBoxComponent } from './message-box/message-box.component';

/**
 * The main module of the application.
 * It imports and configures all the necessary dependencies for the app to function.
 */
const appRoutes: Routes = [
  /**
   * Route for the welcome page, where users can either log in or register.
   */
  { path: 'welcome', component: WelcomePageComponent },
  
  /**
   * Route for the movie cards, where users can view movies.
   */
  { path: 'movies', component: MovieCardComponent },

  /**
   * Route for the user's profile page, where users can view and edit their profile.
   */
  { path: 'profile', component: UserProfileComponent },

  /**
   * Default route, redirects to the welcome page.
   */
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * The root module for the Angular application.
 * This module imports other modules, declares components, and configures the application's routing.
 */
@NgModule({
  /**
   * Declarations of components used in the app.
   */
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    MessageBoxComponent
  ],
  /**
   * Imports external modules required by the app.
   */
  imports: [
    RouterModule.forRoot(appRoutes),  // Sets up the application's routes
    BrowserModule,                    // Enables browser-specific features
    AppRoutingModule,                 // Contains routing configuration
    HttpClientModule,                 // Allows HTTP communication
    BrowserAnimationsModule,          // Enables animations in the app
    FormsModule,                      // Supports forms functionality
    MatDialogModule,                  // Material design dialog components
    MatInputModule,                   // Material design input fields
    MatButtonModule,                  // Material design buttons
    MatCardModule,                    // Material design cards
    MatFormFieldModule,               // Material design form fields
    MatSnackBarModule,                // Material design snackbars
    MatIconModule,                    // Material design icons
    MatGridListModule                 // Material design grid list
  ],
  /**
   * Providers for the app. You can add services here.
   */
  providers: [],
  
  /**
   * Specifies the root component to bootstrap when the app starts.
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
