import React, { useState } from 'react';
import Magnet from './react-bits/Magnet';

const categories = [
  {
    title: "Mental Health & Counseling",
    items: [
      "Anxiety Management", "Depression Treatment", "Bipolar Disorder Treatment",
      "Addictions", "Loneliness & Grief Counselling", "Behaviour & Thought Problems",
      "Low Confidence & Memory Improvement", "Marriage / Marital Counseling",
      "Learning Disability (Dyslexia) Treatment", "Insomnia Treatment", "Individual Therapy & Psychotherapy",
      "Hypnotherapy", "Adult Counselling", "Online Counselling", "Psychiatric Consultation & Evaluations",
      "Mood Disorder Management", "Medication Management"
    ]
  },
  {
    title: "ENT & Eye Care",
    items: [
      "ENT Treatment", "Contoura Vision", "ICL Surgery", "Femto Lasik Surgery",
      "Smile Lasik Surgery", "PRK Lasik", "Vitrectomy", "Squint Surgery",
      "Glaucoma Treatment", "Retinal Detachment", "Cataract Surgery", "Diabetic Retinopathy",
      "LASIK Eye Surgery", "Turbinate Reduction", "Nasal Polyps", "Vocal Cord Polyps",
      "Ear & Throat Surgery", "Myringotomy", "Stapedectomy", "Tonsillectomy",
      "FESS Surgery", "Mastoidectomy", "Septoplasty", "Sinus Treatment",
      "Adenoidectomy", "Tympanoplasty"
    ]
  },
  {
    title: "Orthopedics & Spine",
    items: [
      "Total Knee Replacement", "Shoulder Arthroscopy & Replacement", "Knee Arthroscopy",
      "Arthroscopy Surgery", "Rotator Cuff Repair", "Shoulder Dislocation",
      "Spine Surgery", "Hip Replacement Surgery", "Meniscus Tear", "ACL Tear Treatment",
      "Carpal Tunnel Syndrome"
    ]
  },
  {
    title: "Urology, Proctology & General Surgery",
    items: [
      "Prostatectomy & Enlarged Prostate", "Pilonidal Sinus Treatment", "Fissure & Piles Treatment",
      "Rectal Prolapse", "Foreskin Infection (Balanitis, Phimosis)", "Frenuloplasty & Circumcision",
      "Kidney Stone Treatments (URSL, PCNL, RIRS, ESWL)", "Hydrocele & Varicocele Treatment",
      "Thyroidectomy", "Diabetic Foot Ulcers Treatment", "Varicose Veins & DVT Treatment",
      "Appendicitis", "Gallstones Treatment", "Hernia Treatment (Umbilical, Inguinal)",
      "Laparoscopy", "Sebaceous Cyst & Lipoma Surgery", "Breast Lump & Axillary Breast"
    ]
  },
  {
    title: "Gynaecology & Fertility",
    items: [
      "Uterine Fibroids", "Labiaplasty", "PCOS-PCOD Treatment", "Adenomyosis Treatment",
      "Fertility (Male & Female Infertility)", "Endometriosis Treatment", "Bartholin Cyst Treatment",
      "Miscarriage Treatment", "Ovarian Cyst", "Molar Pregnancy Treatment", "Ectopic Pregnancy Treatment",
      "Surgical Abortion (MTP)", "Egg Freezing", "IVF & IUI Treatment"
    ]
  },
  {
    title: "Aesthetics, Dental & Holistic",
    items: [
      "Accupunture", "Cleft Lip & Earlobe Repair", "Beard & Hair Transplant",
      "Blepharoplasty", "Buccal Fat & Double Chin", "Breast Surgery (Reduction, Augmentation, Lift)",
      "Gynecomastia", "Liposuction", "Dentistry (Aligners, Braces, Implants)"
    ]
  },
  {
    title: "Facilities & Diagnostics",
    items: [
      "Treatment & Consultation Rooms", "Patient Monitors & Devices", "Surgical Lights & Instruments",
      "Anesthesia Machines", "Laboratory Diagnostic Equipment & Tests", "Endoscopy Equipment",
      "MRI Scanner", "Scans & Imaging Services"
    ]
  }
];

export default function ComprehensiveServices() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full flex justify-center py-24 bg-black relative border-y border-white/5">
      {/* Background glow */}
      <div className="absolute inset-0 bg-acc/5 blur-[100px] pointer-events-none"></div>

      <div className="text-center z-10">
        <h2 className="text-3xl font-light text-white mb-4 tracking-tight">Our Extensive Expertise</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto px-4">
          From advanced surgical procedures to holistic wellness and state-of-the-art diagnostics, explore over 80 specialized services we offer.
        </p>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-transparent border border-acc text-acc hover:bg-acc hover:text-black transition-all duration-300 font-semibold py-4 px-10 rounded-sm tracking-widest uppercase text-sm"
        >
          View All Services
        </button>
      </div>

      {/* The Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md">
          <div className="bg-[#050A10] border border-acc/20 rounded-sm w-full max-w-6xl h-[85vh] flex flex-col relative shadow-[0_0_50px_rgba(0,229,255,0.1)]">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-acc/20 bg-acc/5">
              <h3 className="text-2xl font-light text-white tracking-tight">Comprehensive Services Directory</h3>
              <Magnet padding={10} disabled={false} magnetStrength={3}>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/50 hover:text-white transition-colors p-2 text-2xl cursor-pointer"
                >
                  ✕
                </button>
              </Magnet>
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              
              {/* Sidebar Tabs */}
              <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-acc/10 overflow-y-auto max-h-48 md:max-h-full bg-black/50 scrollbar-hide flex-shrink-0">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-6 border-l-4 transition-all duration-300 ${
                      activeTab === idx 
                        ? 'border-acc bg-acc/10 text-white' 
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-lg font-light">{cat.title}</div>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="md:w-2/3 p-8 overflow-y-auto custom-scrollbar relative bg-dom/40">
                {/* Subtle watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                  <span className="text-[150px] font-bold text-acc leading-none text-center">
                    {categories[activeTab].title.split(' ')[0]}
                  </span>
                </div>
                
                <h4 className="text-3xl font-light text-acc mb-8 relative z-10 border-b border-acc/20 pb-4 inline-block">
                  {categories[activeTab].title}
                </h4>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {categories[activeTab].items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      <span className="text-acc mt-1 text-xs">◆</span>
                      <span className="text-gray-200 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
