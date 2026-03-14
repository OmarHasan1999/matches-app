# ⚽ Matches Hub

  **A football matches viewer that displays live scores, fixtures, and results
for today, yesterday, and tomorrow — powered by the API-Sports API.**

## 🌐 [Live Demo](https://matches-hub-app.web.app)

## ✨ Features

- 📅 View matches for **Today**, **Yesterday**, and **Tomorrow**
- ⚡ Live match scores with **minute indicator**
- 🏆 Matches grouped and sorted by **league priority**
- 📱 Fully **responsive** design
- ⚙️ Auto-refresh every **60 seconds** for live matches

---

## 📁 Project Structure

- **front/** - Vue 3 + Vite
- **server/** - Node.js + Express

---

## 🛠️ Tech Stack

| Frontend | Backend |
|---|---|
| Vue 3 + Vite | Node.js + Express |
| Pinia | Axios |
| Vue Router | CORS |
| Vuetify | dotenv |

---

## 🚀 Run Locally (Dev Mode)

### requisites :
- Node.js 18+
- API Key from [api-sports.io](https://api-sports.io) ← Get your free API key here

---

### 1️⃣ Setup Backend
```bash
cd server
npm install
```

**Create `.env` file in `server/` folder :**
```
API_KEY=your_api_key_here
```

> 🔑 Get your free API key from [api-sports.io](https://api-sports.io)
> After signing up → Dashboard → API Key → Copy it

***run backend :***
```bash
node index.js
```

> Backend runs at: **http://localhost:3001**

---

### 3️⃣ Setup Frontend
```bash
cd front
npm install
```

**Create `.env` file in `front/` folder:**
```
VITE_API_URL=http://localhost:3001
```

***run frontend :***
```bash
npm run dev
```

> Frontend runs at: **http://localhost:5173**

---
   

## 🐳 Run with Docker

### Option 1 - Cloning repo (Dev Mode)
```bash
docker compose up --build
```

> App available at: **http://localhost:5173**

***Stop containers :***
```bash
docker compose down
```

---

### Option 2 - Without Cloning (Production Mode)

#### 1️⃣ Pull Docker Images
```bash
docker pull m1234x/matches-frontend:latest
docker pull m1234x/matches-backend:latest
```

#### 2️⃣ Run Containers

***Backend :***
```bash
docker run -d -p 3001:3001 --name matches-backend m1234x/matches-backend:latest
```

***Frontend :***
```bash
docker run -d -p 80:80 --name matches-frontend m1234x/matches-frontend:latest
```

> 🌐 Frontend: **http://localhost**
> ⚙️ Backend: **http://localhost:3001**
