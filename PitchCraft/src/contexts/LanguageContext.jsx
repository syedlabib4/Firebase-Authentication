import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' or 'ur'

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  const translations = {
    en: {
      // Navigation
      home: 'Home',
      dashboard: 'Dashboard',
      createPitch: 'Create Pitch',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      
      // Auth
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      
      // Pitch Creation
      startupIdea: 'Startup Idea',
      describeYourIdea: 'Describe your startup idea',
      industry: 'Industry',
      selectIndustry: 'Select Industry',
      tone: 'Tone',
      professional: 'Professional',
      casual: 'Casual',
      creative: 'Creative',
      generatePitch: 'Generate Pitch',
      
      // Results
      startupName: 'Startup Name',
      tagline: 'Tagline',
      elevatorPitch: 'Elevator Pitch',
      problemStatement: 'Problem Statement',
      solutionStatement: 'Solution Statement',
      targetAudience: 'Target Audience',
      uniqueValueProposition: 'Unique Value Proposition',
      landingPageCopy: 'Landing Page Copy',
      colorPalette: 'Color Palette',
      
      // Actions
      save: 'Save',
      export: 'Export',
      regenerate: 'Regenerate',
      edit: 'Edit',
      
      // Industries
      technology: 'Technology',
      healthcare: 'Healthcare',
      education: 'Education',
      finance: 'Finance',
      ecommerce: 'E-commerce',
      food: 'Food & Beverage',
      travel: 'Travel & Tourism',
      entertainment: 'Entertainment',
      other: 'Other'
    },
    ur: {
      // Navigation
      home: 'ہوم',
      dashboard: 'ڈیش بورڈ',
      createPitch: 'پچ بنائیں',
      login: 'لاگ ان',
      register: 'رجسٹر',
      logout: 'لاگ آؤٹ',
      
      // Auth
      email: 'ای میل',
      password: 'پاس ورڈ',
      confirmPassword: 'پاس ورڈ کی تصدیق',
      signIn: 'سائن ان',
      signUp: 'سائن اپ',
      alreadyHaveAccount: 'پہلے سے اکاؤنٹ ہے؟',
      dontHaveAccount: 'اکاؤنٹ نہیں ہے؟',
      
      // Pitch Creation
      startupIdea: 'اسٹارٹ اپ آئیڈیا',
      describeYourIdea: 'اپنے اسٹارٹ اپ آئیڈیا کو بیان کریں',
      industry: 'انڈسٹری',
      selectIndustry: 'انڈسٹری منتخب کریں',
      tone: 'ٹون',
      professional: 'پروفیشنل',
      casual: 'کیشول',
      creative: 'کریئیٹو',
      generatePitch: 'پچ جنریٹ کریں',
      
      // Results
      startupName: 'اسٹارٹ اپ کا نام',
      tagline: 'ٹیگ لائن',
      elevatorPitch: 'ایلیویٹر پچ',
      problemStatement: 'مسئلہ کا بیان',
      solutionStatement: 'حل کا بیان',
      targetAudience: 'ہدف سامعین',
      uniqueValueProposition: 'منفرد قدر کی تجویز',
      landingPageCopy: 'لینڈنگ پیج کاپی',
      colorPalette: 'رنگوں کا پلیٹ',
      
      // Actions
      save: 'محفوظ کریں',
      export: 'ایکسپورٹ',
      regenerate: 'دوبارہ جنریٹ',
      edit: 'ایڈٹ',
      
      // Industries
      technology: 'ٹیکنالوجی',
      healthcare: 'صحت',
      education: 'تعلیم',
      finance: 'فنانس',
      ecommerce: 'ای کامرس',
      food: 'کھانا اور مشروبات',
      travel: 'سفر اور سیاحت',
      entertainment: 'تفریح',
      other: 'دیگر'
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
