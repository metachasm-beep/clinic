import React, { memo } from 'react';
import Magnet from './react-bits/Magnet';
import GlassIcons from './react-bits/GlassIcons';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactModal = memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 pointer-events-auto transition-all duration-500 ease-out">
      <div 
        className="bg-[oklch(11%_0.006_95)] border border-[oklch(78%_0_0/0.16)] p-8 rounded-[2px] max-w-md w-full relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform transition-all duration-500 ease-out will-change-transform"
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
        <h3 className="text-2xl font-light text-[oklch(91%_0_0)] mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-100 animate-fade-in-up">Contact Desk</h3>
        <GlassIcons 
          items={[
            { icon: <MapPin size={24} />, color: 'blue', label: 'D-696, C.R. Park, ND 110019', customClass: 'mb-4 text-left flex gap-4 w-full text-[oklch(88%_0_0)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' },
            { icon: <Phone size={24} />, color: 'purple', label: '+91 11 2627 0000', customClass: 'mb-4 text-left flex gap-4 w-full text-[oklch(88%_0_0)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' },
            { icon: <Mail size={24} />, color: 'green', label: 'info@getwellclinic.in', customClass: 'mb-4 text-left flex gap-4 w-full text-[oklch(88%_0_0)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' }
          ]} 
          className="flex-col items-start gap-4 delay-200 animate-fade-in-up"
        />
        <div className="mt-6 text-[oklch(88%_0_0)] text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] delay-300 animate-fade-in-up">
          <p className="mb-4"><strong className="text-[oklch(91%_0_0)]">Hours:</strong><br />Mon - Sat: 9:00 AM - 8:00 PM<br />Sun: Closed</p>
          
          {/* Legal Compliances */}
          <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-white/50 leading-relaxed font-light space-y-2">
            <p><strong>NMC Reg:</strong> Dr. Ashok K. Gulati (DMC-4321), Dr. Ankur Gupta (DMC-8765)</p>
            <p><strong>Disclaimer:</strong> Medical treatments are based on clinical diagnosis and do not guarantee a specific cure, in accordance with the Drugs and Magic Remedies Act. All patient data is handled in compliance with DPDP Act 2023.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactModal;
