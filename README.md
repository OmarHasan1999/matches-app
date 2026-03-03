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
```
---

### Run with Docker (Without Cloning the Repo)

- ***If you want to run the app directly with Docker, without cloning the repository:***

### 1️⃣ Pull the Docker image from Docker Hub
- #### Pull frontend image
```
docker pull m1234x/matches-frontend:latest
```

- #### Pull backend image
```
docker pull m1234x/matches-backend:latest
```

### 2️⃣ Run the Docker container
- #### Run backend container
```
docker run -d -p 3001:3001 --name matches-backend m1234x/matches-backend:latest
```

- #### Run frontend container
```
docker run -d -p 80:80 --name matches-frontend m1234x/matches-frontend:latest
```
> The frontend will be available at: http://localhost

> The backend API will be available at: http://localhost:3001
