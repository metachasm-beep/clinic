import React, { useState, useEffect } from 'react';

export default function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('dpdp_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dpdp_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-[#1A1A1B]/95 backdrop-blur-xl border border-[#D4AF37]/30 p-4 md:p-6 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <h4 className="text-[#D4AF37] font-medium text-sm tracking-widest uppercase">Privacy Notice</h4>
          </div>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light">
            In compliance with the Digital Personal Data Protection (DPDP) Act 2023, Get Well Clinic collects and processes your personal health data securely and strictly for medical consultation purposes. By continuing to use this site, you consent to our privacy practices.
          </p>
        </div>

        <div className="flex shrink-0 gap-3 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-black text-xs md:text-sm font-medium tracking-wide rounded-lg transition-colors duration-300"
          >
            Accept & Continue
          </button>
        </div>
        
      </div>
    </div>
  );
}
