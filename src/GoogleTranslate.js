import React, { useEffect } from 'react';
import "./index.css";
const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      if (typeof window.google !== 'undefined' && typeof window.google.translate !== 'undefined') {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ur',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
      
    };

    const hideGoogleTranslateBar = () => {
      const googleTranslateBar = document.querySelector('.goog-te-banner');
      if (googleTranslateBar) {
        googleTranslateBar.style.display = 'none';
      }
    };

    setTimeout(() => {
      googleTranslateElementInit();
      hideGoogleTranslateBar();
    }, 1000);
  }, []);

  return <div id="google_translate_element" style={{
    transform: 'scale(0.8)',
    transformOrigin: 'top right',
    marginTop: '10px',
    
  }}/>;
};

export default GoogleTranslate;
