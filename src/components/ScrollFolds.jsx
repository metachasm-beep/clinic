import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Stethoscope, HeartPulse, Dna, Syringe, Microbes } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ScrollFolds = () => {
  const mainRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up elements in each fold as they enter viewport
      gsap.utils.toArray('.reveal-up').forEach((elem) => {
        gsap.from(elem, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            ease: "power3.out",
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-bold text-2xl tracking-tight">Get&nbsp;Well Clinic</div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#hero" className="hover:text-accent transition-colors">Home</a>
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#doctors" className="hover:text-accent transition-colors">Doctors</a>
        </div>
      </nav>

      {/* Fold 1: Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center p-6 px-4 md:px-20 relative">
        <div className="max-w-4xl w-full reveal-up text-center md:text-left backdrop-blur-md bg-white/5 border border-white/10 p-12 rounded-3xl shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Excellence in <br/><span className="text-accent">Healthcare.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl text-balance">
            Your trusted medical center in Chittaranjan Park, New Delhi. Advanced 3D precision care.
          </p>
          <a href="#services" className="inline-block bg-accent text-background font-bold py-4 px-8 rounded-full hover:bg-white transition-all transform hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent">
            Explore Services
          </a>
        </div>
      </section>

      {/* Fold 2: Services */}
      <section id="services" className="min-h-screen flex items-center justify-center py-24 px-4 md:px-20 relative">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center reveal-up">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "General Consultations", icon: <Stethoscope size={32} className="text-accent"/>, desc: "Routine check-ups, viral fevers, and comprehensive health monitoring." },
              { title: "Dental Care", icon: <Dna size={32} className="text-accent"/>, desc: "Comprehensive oral health care and personalized treatment plans." },
              { title: "ENT Services", icon: <Activity size={32} className="text-accent"/>, desc: "Expert care for ear, nose, and throat conditions." },
              { title: "Acupuncture", icon: <Syringe size={32} className="text-accent"/>, desc: "Advanced, holistic treatment methods for pain management." },
              { title: "Diabetes Management", icon: <HeartPulse size={32} className="text-accent"/>, desc: "Dedicated support and care for controlled and uncontrolled diabetes." },
              { title: "Allergy Diagnosis", icon: <Microbes size={32} className="text-accent"/>, desc: "Accurate testing and effective treatment for various allergies." },
            ].map((service, i) => (
              <div key={i} className="reveal-up backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition-transform cursor-pointer group">
                <div className="mb-6 bg-white/10 p-4 rounded-xl inline-block group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 truncate">{service.title}</h3>
                <p className="text-gray-400 text-balance">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 3: Doctors & Contact */}
      <section id="doctors" className="min-h-screen flex items-center justify-center py-24 px-4 md:px-20 relative">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center reveal-up">Meet Our Specialists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { name: "Dr. Ankur Gupta", spec: "ENT Specialist", img: "../../images/ankur.png" },
              { name: "Dr. Swarajit Ghosh", spec: "Acupuncture", img: "../../images/swarajit.png" },
              { name: "Dr. Gulati Ashok Kumar", spec: "General Physician", img: "../../images/gulati.png" }
            ].map((doc, i) => (
              <div key={i} className="reveal-up backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/50 transition-colors">
                <img src={doc.img} alt={doc.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="320"/>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 truncate">{doc.name}</h3>
                  <p className="text-accent font-medium">{doc.spec}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-up backdrop-blur-md bg-accent text-background p-12 rounded-3xl text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Visit Us Today</h2>
            <p className="text-xl mb-8 font-medium text-balance">D-696, Opposite Market No. 2, Chittaranjan Park, New Delhi, 110019</p>
            <a href="tel:+91" className="inline-block bg-background text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScrollFolds;
