import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { generatePitch } from '../services/geminiService';
import { 
  ArrowLeft, 
  Edit3, 
  Download, 
  Share2, 
  RefreshCw, 
  Copy, 
  Check,
  Sparkles,
  Target,
  Users,
  Lightbulb,
  Palette
} from 'lucide-react';

const GeneratedPitch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPitch = async () => {
      try {
        const docRef = doc(db, 'pitches', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.userId !== currentUser.uid) {
            navigate('/dashboard');
            return;
          }
          setPitch({ id: docSnap.id, ...data });
        } else {
          setError('Pitch not found');
        }
      } catch (error) {
        console.error('Error fetching pitch:', error);
        setError('Failed to load pitch');
      } finally {
        setLoading(false);
      }
    };

    if (id && currentUser) {
      fetchPitch();
    }
  }, [id, currentUser, navigate]);

  const handleRegenerate = async () => {
    if (!pitch) return;
    
    try {
      setRegenerating(true);
      setError('');
      
      const newPitchData = await generatePitch(pitch.idea, pitch.industry, pitch.tone);
      
      await updateDoc(doc(db, 'pitches', id), {
        generatedData: newPitchData,
        updatedAt: serverTimestamp()
      });
      
      setPitch(prev => ({ ...prev, generatedData: newPitchData }));
    } catch (error) {
      console.error('Error regenerating pitch:', error);
      setError('Failed to regenerate pitch. Please try again.');
    } finally {
      setRegenerating(false);
    }
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const exportToPDF = () => {
    // Simple PDF export functionality
    const printWindow = window.open('', '_blank');
    const content = document.getElementById('pitch-content').innerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>PitchCraft - ${pitch?.generatedData?.startupName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            .section h3 { color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 5px; }
            .color-palette { display: flex; gap: 10px; }
            .color-box { width: 50px; height: 50px; border-radius: 8px; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-gray-600">Loading pitch...</p>
        </div>
      </div>
    );
  }

  if (error || !pitch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Pitch not found'}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { generatedData } = pitch;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
              <span>{regenerating ? 'Regenerating...' : t('regenerate')}</span>
            </button>
            
            <button
              onClick={exportToPDF}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{t('export')}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Pitch Content */}
        <div id="pitch-content" className="space-y-8">
          {/* Hero Section */}
          <div className="card text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
            <h1 className="text-4xl font-bold mb-2">{generatedData.startupName}</h1>
            <p className="text-xl opacity-90 mb-4">{generatedData.tagline}</p>
            <p className="text-lg opacity-80">{generatedData.elevatorPitch}</p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold">{t('problemStatement')}</h3>
              </div>
              <p className="text-gray-700">{generatedData.problemStatement}</p>
              <button
                onClick={() => copyToClipboard(generatedData.problemStatement, 'problem')}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                {copied.problem ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied.problem ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold">{t('solutionStatement')}</h3>
              </div>
              <p className="text-gray-700">{generatedData.solutionStatement}</p>
              <button
                onClick={() => copyToClipboard(generatedData.solutionStatement, 'solution')}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                {copied.solution ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied.solution ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Target Audience & Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">{t('targetAudience')}</h3>
              </div>
              <p className="text-gray-700">{generatedData.targetAudience}</p>
              <button
                onClick={() => copyToClipboard(generatedData.targetAudience, 'audience')}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                {copied.audience ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied.audience ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold">{t('uniqueValueProposition')}</h3>
              </div>
              <p className="text-gray-700">{generatedData.uniqueValueProposition}</p>
              <button
                onClick={() => copyToClipboard(generatedData.uniqueValueProposition, 'uvp')}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                {copied.uvp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied.uvp ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Landing Page Copy */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">{t('landingPageCopy')}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Hero Title:</h4>
                <p className="text-gray-700">{generatedData.landingPageCopy.heroTitle}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Hero Subtitle:</h4>
                <p className="text-gray-700">{generatedData.landingPageCopy.heroSubtitle}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {generatedData.landingPageCopy.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Call to Action:</h4>
                <p className="text-gray-700">{generatedData.landingPageCopy.callToAction}</p>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold">{t('colorPalette')}</h3>
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg border-2 border-gray-200"
                  style={{ backgroundColor: generatedData.colorPalette.primary }}
                ></div>
                <p className="text-sm text-gray-600 mt-2">Primary</p>
                <p className="text-xs text-gray-500">{generatedData.colorPalette.primary}</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg border-2 border-gray-200"
                  style={{ backgroundColor: generatedData.colorPalette.secondary }}
                ></div>
                <p className="text-sm text-gray-600 mt-2">Secondary</p>
                <p className="text-xs text-gray-500">{generatedData.colorPalette.secondary}</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg border-2 border-gray-200"
                  style={{ backgroundColor: generatedData.colorPalette.accent }}
                ></div>
                <p className="text-sm text-gray-600 mt-2">Accent</p>
                <p className="text-xs text-gray-500">{generatedData.colorPalette.accent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPitch;

