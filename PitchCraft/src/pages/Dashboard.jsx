import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Plus, Calendar, Eye, Trash2, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'pitches'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pitchesData = [];
      querySnapshot.forEach((doc) => {
        pitchesData.push({ id: doc.id, ...doc.data() });
      });
      setPitches(pitchesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your pitches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('dashboard')}</h1>
            <p className="text-gray-600 mt-2">
              {pitches.length === 0 
                ? 'No pitches yet. Create your first pitch to get started!'
                : `You have ${pitches.length} pitch${pitches.length === 1 ? '' : 'es'}`
              }
            </p>
          </div>
          
          <Link
            to="/create-pitch"
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t('createPitch')}</span>
          </Link>
        </div>

        {/* Pitches Grid */}
        {pitches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No pitches yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first AI-powered startup pitch and see how PitchCraft can transform your idea into a compelling presentation.
            </p>
            <Link
              to="/create-pitch"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Pitch</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitches.map((pitch) => (
              <div key={pitch.id} className="card hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {pitch.generatedData?.startupName || 'Untitled Pitch'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {pitch.generatedData?.tagline || 'No tagline available'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(pitch.createdAt)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Industry:</span> {pitch.industry}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Tone:</span> {pitch.tone}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {pitch.idea}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/pitch/${pitch.id}`}
                    className="btn-primary flex items-center space-x-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Pitch</span>
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {pitches.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {pitches.length}
              </div>
              <div className="text-gray-600">Total Pitches</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">
                {new Set(pitches.map(p => p.industry)).size}
              </div>
              <div className="text-gray-600">Industries Covered</div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {pitches.filter(p => p.updatedAt && p.updatedAt !== p.createdAt).length}
              </div>
              <div className="text-gray-600">Regenerated</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

