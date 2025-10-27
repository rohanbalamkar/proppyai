import React, { useState, useEffect } from 'react';
// First, import the social media icons from lucide-react
import { Bell, Smartphone, Globe, Star, Moon, Sun, Linkedin, Instagram, Mail } from 'lucide-react';
import logo from './assets/logo.png';


export default function TimerComingSoon() {
  const targetDate = new Date('2025-11-02T00:00:00'); // Set target date

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(calculateTimeLeft());
  
  // Initialize dark mode based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // First check if user has manually set a preference
    const savedTheme = localStorage.getItem('userThemePreference');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    // Otherwise use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');


  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-update if user hasn't set a manual preference
      if (!localStorage.getItem('userThemePreference')) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  // Handle manual theme toggle
  const handleToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('userThemePreference', newMode ? 'dark' : 'light');
  };


  const handleNotifyMe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('⚠️ Please enter your email');
      setTimeout(() => setMessage(''), 3000);
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('⚠️ Please enter a valid email');
      setTimeout(() => setMessage(''), 3000);
      return;
    }


    setIsSubmitting(true);


    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '9de1c615-7a24-426a-bdc6-18ac005e877e',
          from_name: 'PropyAI Coming Soon',
          subject: 'New Launch Notification Signup - PropyAI',
          email: email,
          message: `New user wants to be notified: ${email}`,
        }),
      });


      const data = await response.json();


      if (data.success) {
        setMessage('✅ Thanks! We\'ll notify you at launch!');
        setEmail('');
      } else {
        setMessage('❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Something went wrong. Please try again.');
      console.error('Error:', error);
    }


    setIsSubmitting(false);
    setTimeout(() => setMessage(''), 5000);
  };


  const features = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Get reminded with customizable alerts and sounds"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Cross-Platform",
      description: "Works seamlessly on desktop, tablet, and mobile devices"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Offline Mode",
      description: "Keep timing even without an internet connection"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Beautiful UI",
      description: "Elegant design with dark mode and customization options"
    }
  ];


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-30 backdrop-blur-md ${
        darkMode ? 'bg-gray-900/80' : 'bg-white/80'
      } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="PropyAI" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold">PropyAI</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className={`transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}>About</a>
              <a href="#features" className={`transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}>Features</a>
              <a href="#contact" className={`transition-colors ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}>Contact</a>
              <a href="#notify" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all">
                Get Notified
              </a>
            </div>
            
            {/* Mode Toggle Button - Inside navbar */}
            <button
              onClick={handleToggle}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-purple-500' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute top-1/3 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-blue-500' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-indigo-500' : 'bg-indigo-300'
        }`}></div>
      </div>
        
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-40 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <img 
              src={logo} 
              alt="PropyAI Logo" 
              className="w-20 h-20 object-contain rounded-2xl shadow-2xl"
            />
          </div>
          <h1 className={`text-6xl md:text-7xl font-bold mb-4 ${
            darkMode 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300'
              : 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'
          }`}>
            Coming Soon
          </h1>
          <p className={`text-xl md:text-2xl font-light ${
            darkMode ? 'text-blue-200' : 'text-gray-600'
          }`}>
            The ultimate timer app for productivity enthusiasts
          </p>
        </div>


        {/* Countdown */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className={`rounded-2xl p-4 md:p-8 mb-3 shadow-2xl ${
                  darkMode 
                    ? 'bg-white/10 border border-white/20' 
                    : 'bg-white border border-gray-200'
                } backdrop-blur-md`}>
                  <div className={`text-4xl md:text-6xl font-bold ${
                    darkMode 
                      ? 'bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200'
                      : 'bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600'
                  }`}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                </div>
                <div className={`text-sm md:text-base font-medium uppercase tracking-wider ${
                  darkMode ? 'text-blue-300' : 'text-gray-600'
                }`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* About Section */}
        <div id="about" className="max-w-3xl mx-auto mb-16 text-center scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What is PropyAI?</h2>
          <p className={`text-lg md:text-xl leading-relaxed ${
            darkMode ? 'text-blue-200' : 'text-gray-600'
          }`}>
            PropyAI is a powerful yet simple assistance AI application designed to help students learn effectively and happily. 
            Whether you want short notes, animated explanation, test preparation and even have some entertainment time, Proppy provides an interactive and beautiful place to keep you on track.
          </p>
        </div>


        {/* Features Grid */}
        <div id="features" className="max-w-6xl mx-auto mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Amazing Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-white/10 border border-white/20 hover:bg-white/15' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                } backdrop-blur-md`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-purple-400 to-blue-400' 
                    : 'bg-gradient-to-br from-purple-500 to-blue-500'
                }`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={darkMode ? 'text-blue-200' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Notify Me Section */}
        <div id="notify" className="max-w-md mx-auto text-center scroll-mt-24">
          <div className={`rounded-2xl p-8 ${
            darkMode 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-white border border-gray-200'
          } backdrop-blur-md`}>
            <h3 className="text-2xl font-bold mb-4">Get Notified at Launch</h3>
            <p className={`mb-6 ${darkMode ? 'text-blue-200' : 'text-gray-600'}`}>
              Be the first to know when PropyAI launches!
            </p>
            <form onSubmit={handleNotifyMe} className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 ${
                  darkMode 
                    ? 'bg-white/20 border border-white/30 placeholder-blue-300' 
                    : 'bg-gray-100 border border-gray-300 placeholder-gray-500'
                }`}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Notify Me'}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-sm font-medium ${
                message.includes('✅') ? 'text-green-500' : 'text-yellow-500'
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>


        {/* Contact Section */}
        <div id="contact" className="max-w-4xl mx-auto mt-20 text-center scroll-mt-24">
          <div className={`rounded-2xl p-8 ${
            darkMode 
              ? 'bg-white/10 border border-white/20' 
              : 'bg-white border border-gray-200'
          } backdrop-blur-md`}>
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex justify-center gap-8">
              <a 
                href="https://linkedin.com/company/proppyai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 hover:scale-110 transition-transform ${
                  darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <Linkedin className="w-6 h-6" />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://instagram.com/proppyai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 hover:scale-110 transition-transform ${
                  darkMode ? 'text-pink-300 hover:text-pink-200' : 'text-pink-600 hover:text-pink-700'
                }`}
              >
                <Instagram className="w-6 h-6" />
                <span>Instagram</span>
              </a>
              
              <a 
                href="mailto:info@proppyai.com"
                className={`flex items-center gap-2 hover:scale-110 transition-transform ${
                  darkMode ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                <Mail className="w-6 h-6" />
                <span>Email Us</span>
              </a>
            </div>
            
            <p className={`mt-8 text-sm ${
              darkMode ? 'text-blue-200' : 'text-gray-600'
            }`}>
              © 2025 PropyAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
