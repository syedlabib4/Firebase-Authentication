import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, Users, Target, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: language === 'en' ? 'AI-Powered Pitch Generation' : 'AI سے پچ جنریشن',
      description: language === 'en' 
        ? 'Generate professional startup pitches in minutes using advanced AI technology'
        : 'جدید AI ٹیکنالوجی استعمال کرکے منٹوں میں پروفیشنل اسٹارٹ اپ پچ بنائیں'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'en' ? 'Target Audience Analysis' : 'ہدف سامعین کا تجزیہ',
      description: language === 'en'
        ? 'Define and understand your target market with AI-driven insights'
        : 'AI کی مدد سے اپنے ہدف مارکیٹ کو سمجھیں اور اس کی وضاحت کریں'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: language === 'en' ? 'Unique Value Proposition' : 'منفرد قدر کی تجویز',
      description: language === 'en'
        ? 'Craft compelling value propositions that resonate with investors'
        : 'ایسے قائل کرنے والے قدر کے اصول بنائیں جو سرمایہ کاروں کو متاثر کریں'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: language === 'en' ? 'Instant Results' : 'فوری نتائج',
      description: language === 'en'
        ? 'Get complete pitch materials including names, taglines, and landing page copy'
        : 'نام، ٹیگ لائن اور لینڈنگ پیج کاپی سمیت مکمل پچ مواد حاصل کریں'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'en' ? 'PitchCraft' : 'پچ کرافٹ'}
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              {language === 'en' 
                ? 'Your AI Startup Partner' 
                : 'آپ کا AI اسٹارٹ اپ پارٹنر'
              }
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-80 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Transform your startup idea into a compelling pitch in minutes. Generate names, taglines, elevator pitches, and landing page content with the power of AI.'
                : 'اپنے اسٹارٹ اپ آئیڈیا کو منٹوں میں ایک قائل کرنے والے پچ میں تبدیل کریں۔ AI کی طاقت سے نام، ٹیگ لائن، ایلیویٹر پچ اور لینڈنگ پیج مواد بنائیں۔'
              }
            </p>
            
            {currentUser ? (
              <Link
                to="/create-pitch"
                className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>{t('createPitch')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span>{t('register')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  <span>{t('login')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Why Choose PitchCraft?' : 'پچ کرافٹ کیوں منتخب کریں؟'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Everything you need to create professional startup pitches'
                : 'پروفیشنل اسٹارٹ اپ پچ بنانے کے لیے آپ کو جو کچھ چاہیے'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Ready to Pitch Your Idea?' : 'اپنے آئیڈیا کو پچ کرنے کے لیے تیار؟'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'en'
              ? 'Join thousands of entrepreneurs who have transformed their ideas into compelling pitches'
              : 'ہزاروں کاروباری افراد میں شامل ہوں جنہوں نے اپنے آئیڈیاز کو قائل کرنے والے پچ میں تبدیل کیا ہے'
            }
          </p>
          
          {!currentUser && (
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <span>{language === 'en' ? 'Get Started Now' : 'ابھی شروع کریں'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
