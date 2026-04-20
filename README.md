🚀 ReleaseRadar

Discover. Track. Never miss a drop.

ReleaseRadar is a modern, production-level React web application that helps users discover and track upcoming releases across multiple categories including Movies, Shows, Anime, Games, and Sports events.

Built with a focus on real-world usability, clean UI/UX, and scalable architecture, this project integrates multiple APIs and Firebase to deliver a personalized tracking experience.

#####

🌟 Features

🔍 Discover Releases
Browse releases from 2024 – 2026
Categories:
🎬 Movies
📺 Shows
🎌 Anime
🎮 Games
⚽ Sports Events

Filter by:
Category
Year
Platform
Title search

#####

❤️ Watchlist System
Add releases to personal watchlist
Persistent storage using:
🔥 Firebase Firestore
💾 LocalStorage fallback
Track status:
Interested
Watching
Completed

#####

🔐 Authentication
Firebase Authentication:
Email & Password login/signup
User-specific data storage
Protected routes (Dashboard, Watchlist, Profile)

#####

⚡ Real-time Feedback
Toast notifications:
✅ “Added to Watchlist”
Loading states for better UX
Error handling (API/network issues)

#####

🎨 Premium UI/UX
Black + Bright Orange theme
Glassmorphism + gradient design
Netflix-style navbar with animated logo
Responsive layout (mobile-friendly)
Smooth hover + micro-interactions

#####

🧠 Tech Stack

Frontend
⚛️ React (Vite)
🎨 CSS (Custom styling, no frameworks)
🔄 React Hooks

Backend / Services
🔥 Firebase
Authentication
Firestore Database

APIs Used
🎮 RAWG API → Games data
🎬 TMDB API → Movies & Shows
📺 Custom logic → Anime (curated + API)
⚽ Static curated data → Sports events

#####

📁 Project Structure
src/
│
├── components/ # UI components (cards, navbar, modals, etc.)
├── pages/ # Main pages (Discover, Watchlist, Dashboard)
├── services/ # API integrations (TMDB, RAWG, etc.)
├── hooks/ # Custom hooks (auth, watchlist)
├── context/ # AuthContext (global state)
├── utils/ # Helper functions (formatters, etc.)
├── styles/ # index.css (global styling)

#####

⚙️ Setup & Installation
1️⃣ Clone the repo
git clone https://github.com/your-username/release-radar.git
cd release-radar
2️⃣ Install dependencies
npm install
3️⃣ Create .env file

# Firebase

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# APIs

VITE_RAWG_API_KEY=your_rawg_key
VITE_TMDB_API_KEY=your_tmdb_key
4️⃣ Run the app
npm run dev

App will run on:

http://localhost:5173

#####

🧪 Key Functionalities
🔄 Debounced search filtering
⚡ API integration with async/await
🔐 Auth state management using Context API
💾 Data persistence (Firestore + LocalStorage)
🧩 Component-based architecture
📦 Environment variable handling (Vite)

#####

⚠️ Limitations
Streaming platform data (Netflix, Prime, etc.) is not always accurate due to API limitations
Anime data is partially curated (not fully API-driven)
Some APIs may be blocked by network/firewall
🚀 Future Improvements
🎯 Accurate streaming platform detection
📱 PWA support (offline usage)
🔔 Notifications for upcoming releases
🎥 Trailer integration (YouTube API)
🧠 AI-based recommendations

#####

👨‍💻 Author

Nishant Borah
Scaler School of Technology
Batch: 2029

#####

🏁 Conclusion

ReleaseRadar demonstrates a real-world, production-ready React application combining:

API integrations
Authentication
State management
Clean UI/UX

It solves a practical problem:
👉 Keeping track of releases across multiple entertainment domains.
