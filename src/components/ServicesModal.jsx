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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 pointer-events-auto transition-all duration-500 ease-out">
      <div 
        className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-8 rounded-[2px] max-w-4xl w-full relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-h-[90vh] flex flex-col will-change-transform"
        style={{ perspective: 1000 }}
      >
        <button 
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(50);
            onClose();
          }} 
          className="absolute top-4 right-4 text-[oklch(88%_0_0)]/50 hover:text-[oklch(84%_0.19_80.46)] transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer z-50"
        >
          ✕
        </button>
        
        <h3 className="text-2xl font-light text-[oklch(91%_0_0)] mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shrink-0">Discover Services</h3>
        
        {/* Horizontal scroll on mobile (swipable), Grid on desktop */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto max-md:flex max-md:flex-row max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:space-x-4 max-md:pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 no-scrollbar"
        >
          {[
            { fold: 2, title: 'General Physician', desc: 'Dr. Ankur Gupta - Expert care, fevers, & monitoring.', color: 'rgba(0, 229, 255, 0.2)', textClass: 'text-acc' },
            { fold: 3, title: 'Acupuncture Therapy', desc: 'Holistic treatment for pain and wellness.', color: 'rgba(212, 175, 55, 0.2)', textClass: 'text-[#D4AF37]' },
            { fold: 4, title: 'Preventive Healthcare', desc: 'Proactive check-ups and health plans.', color: 'rgba(0, 229, 255, 0.2)', textClass: 'text-acc' },
            { fold: 5, title: 'ENT Specialists', desc: 'Diagnostic precision for ear, nose, throat.', color: 'rgba(255, 255, 255, 0.2)', textClass: 'text-white' },
            { fold: 6, title: 'Senior Physician', desc: 'Dr. Ashok K. Gulati - Decades of legacy care.', color: 'rgba(212, 175, 55, 0.2)', textClass: 'text-[#D4AF37]' },
            { fold: 7, title: 'Chronic Care', desc: 'Management for long-term conditions.', color: 'rgba(0, 229, 255, 0.2)', textClass: 'text-acc' }
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
