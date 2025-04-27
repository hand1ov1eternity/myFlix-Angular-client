# myFlix Angular Client

## Overview

myFlix is a movie discovery app built using Angular. It allows users to browse movies, view details about directors and genres, and manage their favorite movies.

## Features

- User authentication (registration & login)
- Browse movies with detailed information
- View director and genre details
- Add/remove movies from favorites
- Update user profile
- Fully responsive UI with Angular Material

## Tech Stack

- **Frontend**: Angular 16, Angular Material
- **Backend**: Node.js, Express.js, MongoDB (Hosted on Render)
- **Deployment**: GitHub Pages
- **API Communication**: Fetch API with authentication via JWT

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Hand1ov1eternity/myFlix-Angular-client.git
   cd myFlix-Angular-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the app locally:
   ```sh
   ng serve
   ```
   The app will be available at `http://localhost:4200/`

## Usage

- Register/Login to access features
- Browse and search for movies
- Click on a movie for details
- Add/remove favorites
- Update profile information

## API & Authentication

The app interacts with the myFlix API, which requires user authentication via JWT. Upon login, a token is stored in `localStorage` and used for API requests.

## Deployment

This app is deployed on GitHub Pages:
[myFlix Angular Client](https://hand1ov1eternity.github.io/myFlix-Angular-client/)

To build and deploy:

```sh
ng build --base-href "/myFlix-Angular-client/"
npx angular-cli-ghpages --dir=dist/my-flix-angular-client
```

## Documentation

Auto-generated TypeDoc documentation is available in the `docs/` folder.
