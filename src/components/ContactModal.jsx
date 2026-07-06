import React, { memo } from 'react';
import Magnet from './react-bits/Magnet';
import GlassIcons from './react-bits/GlassIcons';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactModal = memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md pointer-events-auto transition-all duration-500 ease-out">
      <div 
        className="bg-[#1A1A1B]/40 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl max-w-md w-full relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform transition-all duration-500 ease-out will-change-transform"
        style={{ perspective: 1000, WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"></div>
        <Magnet padding={10} disabled={false} magnetStrength={3}>
          <button 
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              onClose();
            }} 
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer z-50"
          >
            ✕
          </button>
        </Magnet>
        <h3 className="text-2xl font-light text-white mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100 animate-fade-in-up">Contact Desk</h3>
        <GlassIcons 
          items={[
            { icon: <MapPin size={24} />, color: 'blue', label: 'D-696, C.R. Park, ND 110019', customClass: 'mb-4 text-left flex gap-4 w-full text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' },
            { icon: <Phone size={24} />, color: 'purple', label: '+91 11 2627 0000', customClass: 'mb-4 text-left flex gap-4 w-full text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' },
            { icon: <Mail size={24} />, color: 'green', label: 'info@getwellclinic.in', customClass: 'mb-4 text-left flex gap-4 w-full text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' }
          ]} 
          className="flex-col items-start gap-4 delay-200 animate-fade-in-up"
        />
        <div className="mt-6 text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-300 animate-fade-in-up">
          <p><strong className="text-white">Hours:</strong><br />Mon - Sat: 9:00 AM - 8:00 PM<br />Sun: Closed</p>
        </div>
      </div>
    </div>
  );
});

export default ContactModal;
