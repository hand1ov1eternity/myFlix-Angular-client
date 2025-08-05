# 🎥 myFlix Angular Client

🔗 **[Live Demo »](https://hand1ov1eternity.github.io/myFlix-Angular-client/)**

---

## 🎯 Features

- 🔐 **User Authentication**
  - Sign up and log in with secure JWT-based authentication.

- 🎞️ **Movie Browser**
  - Browse a list of movies with full details including title, description, genre, and director.

- 🧠 **Director & Genre Info**
  - View detailed descriptions for directors and genres.

- ⭐ **Favorite Movies**
  - Add or remove movies from your favorites list.

- 👤 **Profile Management**
  - Update your username, password, email, and birthday.

- 📱 **Responsive Design**
  - Built with Angular Material for a fully responsive user experience.

---

## 🛠️ Tech Stack

Frontend: Angular 16, Angular Material

Backend: Node.js, Express.js, MongoDB (Hosted on Render)

API Communication: Fetch API + JWT Authentication

Deployment: GitHub Pages

---

## ⚙️ Installation

### ✅ Prerequisites

- Node.js & npm
- Angular CLI installed globally (`npm install -g @angular/cli`)

---

### 📦 Setup

Clone the repository:

git clone https://github.com/Hand1ov1eternity/myFlix-Angular-client.git
cd myFlix-Angular-client

Install dependencies:

npm install
Run the app locally:

ng serve

Visit:

http://localhost:4200/

---

### 🧪 Usage
Register or log in to access all features

Browse and search movies from the catalog

Click a movie to view its genre, director, and description

Add/remove favorites

Edit or delete your user profile

### 🔐 API & Authentication
This app communicates with the myFlix API hosted on Render. All secure routes require JWT authentication:

On login, a JWT token is stored in localStorage

Token is used for all protected API requests

### 🚀 Deployment
This app is deployed to GitHub Pages.

To build and deploy:

ng build --base-href "/myFlix-Angular-client/"
npx angular-cli-ghpages --dir=dist/my-flix-angular-client

### 📖 Documentation
Auto-generated TypeDoc documentation is available in the docs/ folder.

### 🤝 Contributing
Contributions are welcome!
To contribute:

Fork the repository

Create a new branch (feature/your-feature)

Make and test your changes

Submit a pull request

---

> Built with Angular, Material Design, and movie magic 🎬✨ — always a work in progress 🚧.
