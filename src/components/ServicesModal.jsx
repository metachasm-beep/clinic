import React, { memo, useEffect, useRef } from 'react';
import Magnet from './react-bits/Magnet';
import SpotlightCard from './react-bits/SpotlightCard';

const ServicesModal = memo(({ isOpen, onClose, scrollToFold }) => {
  const containerRef = useRef(null);

  // Isometric Entry Animation
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.service-card');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) rotateX(20deg) rotateZ(-5deg)';
        card.style.transition = `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s`;
        
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (card) {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) rotateX(0deg) rotateZ(0deg)';
            }
          }, 50);
        });
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCardClick = (foldIndex) => {
    if (navigator.vibrate) navigator.vibrate(50);
    scrollToFold(foldIndex);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md pointer-events-auto transition-all duration-500 ease-out">
      <div 
        className="bg-[#1A1A1B]/40 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl max-w-4xl w-full relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-h-[90vh] flex flex-col will-change-transform"
        style={{ perspective: 1000 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"></div>
        <Magnet padding={10} disabled={false} magnetStrength={3}>
          <button 
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              onClose();
            }} 
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 z-50 cursor-pointer"
          >
            ✕
          </button>
        </Magnet>
        
        <h3 className="text-2xl font-light text-white mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shrink-0">Discover Services</h3>
        
        {/* Horizontal scroll on mobile (swipable), Grid on desktop */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto max-md:flex max-md:flex-row max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:space-x-4 max-md:pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 no-scrollbar"
        >
          {[
            { fold: 3, title: 'General Physician', desc: 'Dr. Ankur Gupta - Expert care, fevers, & monitoring.', color: 'rgba(0, 229, 255, 0.2)', textClass: 'text-acc' },
            { fold: 6, title: 'Acupuncture Therapy', desc: 'Holistic treatment for pain and wellness.', color: 'rgba(212, 175, 55, 0.2)', textClass: 'text-[#D4AF37]' },
            { fold: 9, title: 'Preventive Healthcare', desc: 'Proactive check-ups and health plans.', color: 'rgba(0, 229, 255, 0.2)', textClass: 'text-acc' },
            { fold: 12, title: 'ENT Specialists', desc: 'Diagnostic precision for ear, nose, throat.', color: 'rgba(255, 255, 255, 0.2)', textClass: 'text-white' },
            { fold: 15, title: 'Senior Physician', desc: 'Dr. Ashok K. Gulati - Decades of legacy care.', color: 'rgba(212, 175, 55, 0.2)', textClass: 'text-[#D4AF37]' },
            { fold: 18, title: 'Chronic Care', desc: 'Management for long-term conditions.', color: 'rgba(0, 229, 255, 0.2)', textClass: 'text-acc' }
          ].map((item, idx) => (
            <div key={idx} className="service-card max-md:min-w-[85vw] max-md:snap-center shrink-0">
              <SpotlightCard 
                className="p-6 h-full cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 transition-colors" 
                spotlightColor={item.color} 
                onClick={() => handleCardClick(item.fold)}
              >
                <h4 className={`${item.textClass} font-medium mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>{item.title}</h4>
                <p className="text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{item.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ServicesModal;
