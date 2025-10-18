import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { generatePitch } from '../services/geminiService';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Loader2, Sparkles } from 'lucide-react';

const CreatePitch = () => {
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const industries = [
    { value: 'technology', label: t('technology') },
    { value: 'healthcare', label: t('healthcare') },
    { value: 'education', label: t('education') },
    { value: 'finance', label: t('finance') },
    { value: 'ecommerce', label: t('ecommerce') },
    { value: 'food', label: t('food') },
    { value: 'travel', label: t('travel') },
    { value: 'entertainment', label: t('entertainment') },
    { value: 'other', label: t('other') }
  ];

  const tones = [
    { value: 'professional', label: t('professional') },
    { value: 'casual', label: t('casual') },
    { value: 'creative', label: t('creative') }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idea.trim() || !industry) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      // Generate pitch using Gemini AI
      const pitchData = await generatePitch(idea, industry, tone);
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'pitches'), {
        userId: currentUser.uid,
        idea: idea.trim(),
        industry,
        tone,
        generatedData: pitchData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Navigate to the generated pitch
      navigate(`/pitch/${docRef.id}`);
    } catch (error) {
      console.error('Error creating pitch:', error);
      setError('Failed to generate pitch. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('createPitch')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('describeYourIdea')}
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                {t('startupIdea')} *
              </label>
              <textarea
                id="idea"
                name="idea"
                rows={6}
                required
                className="input-field resize-none"
                placeholder={t('describeYourIdea')}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-500">
                Describe your startup idea in detail. The more specific you are, the better the AI can generate relevant content.
              </p>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                {t('industry')} *
              </label>
              <select
                id="industry"
                name="industry"
                required
                className="input-field"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">{t('selectIndustry')}</option>
                {industries.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('tone')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tones.map((toneOption) => (
                  <label
                    key={toneOption.value}
                    className={`relative flex cursor-pointer rounded-lg p-4 focus:outline-none ${
                      tone === toneOption.value
                        ? 'ring-2 ring-primary-500 bg-primary-50'
                        : 'ring-1 ring-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={toneOption.value}
                      checked={tone === toneOption.value}
                      onChange={(e) => setTone(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {toneOption.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
              
              <button
                type="submit"
                disabled={loading || !idea.trim() || !industry}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('generatePitch')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            What you'll get:
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Creative startup name and tagline</li>
            <li>• Professional elevator pitch</li>
            <li>• Problem and solution statements</li>
            <li>• Target audience analysis</li>
            <li>• Unique value proposition</li>
            <li>• Landing page copy and color palette</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePitch;

