# DailyBlend

## Overview
This project is a full-stack web application built using **React**, **Express.js**, **Vite**, and **MongoDB**. It integrates with external APIs such as **The Movie Database (TMDb)** and **OpenWeatherMap** to provide dynamic content and features. 

### Key Features:
- **Home Page**:
  - Manage to-do lists and shows time.
- **Weather Page**:
  - Search for and display the current weather of any city using OpenWeatherMap API.
- **Movies Page**:
  - Discover new movies and view trending content fetched from the TMDb API.
- **User Authentication**:
  - Register and login functionality.
  - Save movies from the Movies Page to your profile.
  - View your saved movies on your profile page.
  - View your saved to-di list on the home page.

---

## Tech Stack

### Frontend:
- **React**: For building the user interface.
- **Vite**: For a fast and optimized development experience.

### Backend:
- **Express.js**: For creating RESTful API endpoints.
- **MongoDB**: For database management to store user data and saved movies.

### APIs Used:
- **TMDb API**: For fetching movie data and trending movies.
- **OpenWeatherMap API**: For fetching weather information by city.

---

## Installation & Setup

### Prerequisites:
- Node.js (v14+ recommended)
- MongoDB instance (local or cloud-based)

### Steps:
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Zsombor01/DailyBlend/
   cd DailyBlend
   ```

2. **Install Dependencies:**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the `server` directory and provide the following details:
   ```env
   DATABASE_URI=your-mongodb-uri
   WEATHER_API_KEY=your-openweathermap-api-key
   TMDB_API_KEY=your-tmdb-api-key
   ```

4. **Start the Application:**
   - Start the backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

5. **Access the Application:**
   Open your browser and go to: `http://localhost:3000` (or the port specified by Vite).

---

## Features in Detail

### Home Page:
- Shows your current time.
- Simple to-do list management functionality.

### Weather Page:
- Search by city to get current weather details such as temperature and wind speed.

### Movies Page:
- Explore trending and new movies fetched dynamically from TMDb API.
- Save movies to your profile for easy access later.

### User Authentication:
- Register and log in securely.
- View and manage your saved movies on your profile page.
- View and manage your to-do list on the home page.

---

## Folder Structure
```
project-name
├── frontend/          # React frontend code
├── backend/           # Express backend code
├── .env               # Environment variables (server)
├── README.md          # Project documentation
```
