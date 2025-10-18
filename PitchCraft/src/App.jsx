import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePitch from './pages/CreatePitch';
import GeneratedPitch from './pages/GeneratedPitch';
import Home from './pages/Home';

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={currentUser ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route 
            path="/dashboard" 
            element={currentUser ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/create-pitch" 
            element={currentUser ? <CreatePitch /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/pitch/:id" 
            element={currentUser ? <GeneratedPitch /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
