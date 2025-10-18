# PitchCraft Setup Guide

## Quick Start Instructions

### 1. Environment Setup
Create a `.env` file in the PitchCraft directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 2. Firebase Setup Steps
1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Authentication (Email/Password provider)
4. Enable Firestore Database
5. Copy your config from Project Settings > General > Your apps

### 3. Gemini API Setup
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the API key to your .env file

### 4. Run the Application
```bash
npm run dev
```

### 5. Test the Application
1. Open http://localhost:5173
2. Register a new account
3. Create your first pitch
4. Test the bilingual toggle (English/Urdu)

## Features Implemented ✅

- ✅ User Authentication (Login/Register)
- ✅ AI-Powered Pitch Generation using Gemini
- ✅ Bilingual Support (English + Roman Urdu)
- ✅ Modern Responsive UI with Tailwind CSS
- ✅ Dashboard to manage pitches
- ✅ Export functionality (PDF)
- ✅ Copy to clipboard features
- ✅ Regenerate pitch option
- ✅ Industry and tone selection
- ✅ Firebase Firestore integration
- ✅ Real-time pitch updates

## Project Structure

```
PitchCraft/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── LanguageContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreatePitch.jsx
│   │   └── GeneratedPitch.jsx
│   ├── services/
│   │   └── geminiService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Next Steps for Production

1. Set up Firebase project with proper security rules
2. Get Gemini API key from Google AI Studio
3. Deploy to Vercel or Firebase Hosting
4. Test all features thoroughly
5. Add error handling and loading states
6. Implement pitch deletion functionality
7. Add more industries and customization options

## Demo Credentials (For Testing)

You can use any email/password combination to test the authentication flow. The app will work with demo data until you set up real Firebase and Gemini credentials.
