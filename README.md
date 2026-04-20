# 🚀 ReleaseRadar – Multi-Domain Release Tracking Web App

## Project Title & Description
**ReleaseRadar** is a modern, production-level **React web application** designed to help users **discover, track, and manage upcoming releases** across multiple entertainment domains.

The platform integrates real-world APIs and Firebase services to deliver a **personalized, scalable, and user-friendly experience**, ensuring users never miss important releases.

---

## 📸 Application Preview
<img width="1547" height="905" alt="Screenshot 2026-04-20 at 10 43 38 PM" src="https://github.com/user-attachments/assets/e70380d2-6c5b-4747-96b6-4313fb56ca48" />


---

## 🌐 Live Demo
Project website 👉 https://nishant-chilled.github.io/RELEASE-RADAR-END-TERM-PROJECT/#/dashboard
Project features and demo video [YT link (unlisted)] 👉 https://youtu.be/SA9vM4vbSrs
---

## 📁 Project Structure
---

```

 src/

│
├── components/ # Reusable UI components (cards, navbar, modals)
├── pages/ # Main pages (Discover, Watchlist, Dashboard)
├── services/ # API integrations (TMDB, RAWG)
├── hooks/ # Custom hooks
├── context/ # Global state (AuthContext)
├── utils/ # Helper functions
├── styles/ # Global styling (index.css)

```

## 🧩 Problem Statement
Tracking releases across platforms like movies, anime, games, and sports is fragmented and inefficient.  
Users often rely on multiple sources and still miss updates.

**ReleaseRadar solves this by:**
- Centralizing release discovery across domains  
- Providing a personalized watchlist system  
- Offering filtering, search, and tracking tools in one platform  

---

## 🌟 Features Implemented

### 🔍 Discover Releases
- Browse releases from **2024 – 2026**
- Categories:
  - 🎬 Movies  
  - 📺 Shows  
  - 🎌 Anime  
  - 🎮 Games  
  - ⚽ Sports Events  

- Advanced filtering:
  - Category  
  - Year  
  - Platform  
  - Title search  

---

### ❤️ Watchlist System
- Add items to personal watchlist  
- Track status:
  - Interested  
  - Watching  
  - Completed  

- Data persistence using:
  - 🔥 Firebase Firestore  
  - 💾 LocalStorage (fallback)  

---

### 🔐 Authentication
- Firebase Authentication:
  - Email & Password login/signup  
- User-specific data storage  
- Protected routes:
  - Dashboard  
  - Watchlist  
  - Profile  

---

### ⚡ Real-time Feedback
- Toast notifications:
  - ✅ “Added to Watchlist”  
- Loading indicators  
- Error handling for API/network failures  

---

### 🎨 UI/UX Design
- Premium **Black + Bright Orange theme**  
- Glassmorphism + gradient UI  
- Netflix-style animated navbar  
- Fully responsive design  
- Smooth hover effects & micro-interactions  

---

## 🧠 Tech Stack

### Frontend
- ⚛️ React (Vite)  
- 🎨 Custom CSS (no frameworks)  
- 🔄 React Hooks  

### Backend / Services
- 🔥 Firebase  
  - Authentication  
  - Firestore Database  

### APIs Used
- 🎬 TMDB API → Movies & Shows  
- 🎮 RAWG API → Games  
- 🎌 Anime → Curated + partial API  
- ⚽ Sports → Static curated dataset  

---

## ⚙️ Steps to Run the Project

1️⃣ Clone the repository
git clone https://github.com/your-username/release-radar.git
cd release-radar

2️⃣ Install dependencies
npm install

3️⃣ Create `.env` file

## Firebase
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
## APIs
VITE_RAWG_API_KEY=your_rawg_key
VITE_TMDB_API_KEY=your_tmdb_key

4️⃣ Run the application
npm run dev
App will run on:
http://localhost:5173

---

## 🧪 Key Functionalities
- Debounced search filtering  
- API integration using async/await  
- Authentication state via Context API  
- Firestore + LocalStorage persistence  
- Component-based architecture  
- Environment variable handling (Vite)  

---

## ⚠️ Known Limitations
- Streaming platform data may not always be accurate  
- Anime data partially curated  
- Some APIs may fail due to network/firewall restrictions  

---

## 🚀 Future Improvements
- 🎯 Accurate platform detection  
- 📱 Progressive Web App (PWA) support  
- 🔔 Release notifications  
- 🎥 Trailer integration (YouTube API)  
- 🧠 AI-based recommendations  

---

## ✨ Author
**Nishant Borah**  
Scaler School of Technology (SST)  
Batch: 2029  

---

## 🏁 Conclusion
**ReleaseRadar** is a real-world, production-ready React application demonstrating:

- API integration  
- Authentication systems  
- State management  
- Scalable architecture  
- Premium UI/UX design  

👉 It solves a practical problem:  
**Keeping track of releases across multiple entertainment domains in one place.**
