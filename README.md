# Matches App

> A simple football matches viewer app showing fixtures for today, yesterday, and tomorrow using the API-SPORTS API

## Project Structure

- **front/** - Vue 3 + Vite
- **server/** - Node.js + Express

## How to Run

### Backend

1. Navigate to the `server` folder:
   
   ## cd "server" ##
   
2. Install dependencies:

   ## npm install ##
   
4. Start the backend server:

   ## node index.js ##

### Frontend
1. Navigate to the `front` folder:
   
   ## cd "front" ##
   
3. Install dependencies:

   ## npm install ##
   
5. Start the frontend development server:
   
   ## npm run dev ##
   
## Run with Docker

**If you to run using Docker, follow these steps :**

- **Navigate to the main folder**

- **Build and start the containers**

```
docker compose up --build
```

> The application will be available at : http://localhost:5173

- **Stop containers**
```
docker compose down
