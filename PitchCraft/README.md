# PitchCraft - AI Startup Pitch Generator

**PitchCraft** is a bilingual (English + Roman Urdu) AI-powered startup pitch generator that helps students and entrepreneurs transform their startup ideas into compelling, professional pitches in minutes.

## 🚀 Features

- **AI-Powered Pitch Generation**: Generate startup names, taglines, elevator pitches, and landing page content using Google's Gemini AI
- **Bilingual Support**: Switch between English and Roman Urdu interface
- **Professional Templates**: Get structured pitch materials including problem/solution statements, target audience analysis, and unique value propositions
- **Color Palette Generation**: AI-suggested color schemes for branding
- **Export Functionality**: Export pitches as PDF for presentations
- **User Dashboard**: Save, manage, and regenerate your pitches
- **Modern UI**: Beautiful, responsive design built with React and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **AI**: Google Gemini 1.5 Flash API
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup
- Google Gemini API key

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd PitchCraft
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your Firebase configuration

### 3. Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Firestore Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pitches/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📱 Usage Guide

### 1. Registration/Login
- Create an account or login with email/password
- Switch between English and Urdu using the language toggle

### 2. Create a Pitch
- Navigate to "Create Pitch"
- Describe your startup idea in detail
- Select industry and tone (Professional/Casual/Creative)
- Click "Generate Pitch" to get AI-powered results

### 3. View Generated Pitch
- Review the complete pitch including:
  - Startup name and tagline
  - Elevator pitch
  - Problem and solution statements
  - Target audience analysis
  - Unique value proposition
  - Landing page copy
  - Color palette suggestions

### 4. Manage Pitches
- View all your pitches in the dashboard
- Regenerate pitches with different tones
- Export pitches as PDF
- Copy individual sections to clipboard

## 🎨 Customization

### Adding New Industries

Edit `src/pages/CreatePitch.jsx`:

```javascript
const industries = [
  { value: 'technology', label: t('technology') },
  { value: 'healthcare', label: t('healthcare') },
  // Add new industries here
  { value: 'new-industry', label: t('newIndustry') }
];
```

### Adding New Languages

1. Update `src/contexts/LanguageContext.jsx` with new translations
2. Add language option to the toggle in `src/components/Navbar.jsx`

### Customizing AI Prompts

Modify the prompt in `src/services/geminiService.js` to change the AI output format or add new fields.

## 🔒 Security Features

- Firebase Authentication for secure user management
- Firestore security rules to protect user data
- Environment variables for API keys
- Input validation and error handling

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review Firebase and Gemini API documentation

## 🎯 Roadmap

- [ ] Pitch templates for different industries
- [ ] Team collaboration features
- [ ] Pitch presentation mode
- [ ] Integration with design tools
- [ ] Advanced analytics
- [ ] Mobile app version

---

**PitchCraft** - Transform your startup ideas into compelling pitches with the power of AI! 🚀