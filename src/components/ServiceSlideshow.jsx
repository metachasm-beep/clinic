import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './react-bits/TiltedCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Get Well Clinic CR Park",
    desc: "Your premier destination for comprehensive healthcare in Chittaranjan Park, New Delhi. Featuring expert general physicians and holistic treatments.",
    bgColor: "bg-dom",
    bgAsset: "/assets/heroscroll2/scene-052.jpg"
  },
  {
    title: "Dr. Ashok Kumar Gulati",
    desc: "Experience proactive, patient-centric healthcare with Dr. Gulati, offering decades of experience in general medicine and family health.",
    bgColor: "bg-dom",
    bgAsset: ""
  },


  {
    title: "Immunization & Wellness",
    desc: "Stay protected with scheduled immunizations, seasonal flu shots, and personalized wellness counseling for all age groups.",
    bgColor: "bg-dom",
    bgAsset: ""
  },
  {
    title: "Patient-First Approach",
    desc: "Rated 4.3/5 stars by our patients. We prioritize your comfort, offering minimized wait times and a compassionate healing environment.",
    bgColor: "bg-dom",
    bgAsset: ""
  },
  {
    title: "Book Your Visit",
    desc: "Located opposite Market No. 2, C.R. Park. Call ahead to book an appointment with our specialists and avoid long queues.",
    bgColor: "bg-dom",
    bgAsset: ""
  }
];

export default function ServiceSlideshow() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Tunnel Transition (First 10% of scroll)
      const tunnelLayers = gsap.utils.toArray('.tunnel-layer');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000%", // 1000vh total scroll length
          scrub: 1,
          pin: true,
        }
      });

      // Part A: Tunnel Effect
      tl.to(tunnelLayers, {
        scale: (i) => 2.5 + i * 1.5, 
        opacity: (i) => i === tunnelLayers.length - 1 ? 1 : 0, 
        ease: "power2.inOut",
        duration: 1
      }, 0);

      // Fade in the first slide text
      tl.fromTo('.slide-text-0', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);

      // Part B: Slideshow crossfades (Slides 1 through 9)
      // Each slide takes 1 duration unit. 
      // Total duration after tunnel is 9 units.
      for (let i = 1; i < services.length; i++) {
        const startTime = i + 0.5; // Staggered slightly after tunnel completes

        // Fade OUT previous text
        tl.to(`.slide-text-${i - 1}`, { y: -100, opacity: 0, duration: 0.5, ease: "power2.in" }, startTime);

        // Fade IN new background (clip-path wipe effect for innovative transition)
        tl.fromTo(`.slide-bg-${i}`, 
          { clipPath: 'inset(100% 0 0 0)' }, 
          { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: "power2.inOut" }, 
          startTime
        );

        // Fade IN new text
        tl.fromTo(`.slide-text-${i}`, 
          { y: 100, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 
          startTime + 0.5
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Backgrounds Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        
        {/* Slide 0: The Tunnel Transition Background */}
        <div className={`slide-bg-0 absolute inset-0 w-full h-full ${services[0].bgColor}`}>
          {[1, 2, 3, 4].map((_, i) => (
            <div 
              key={i}
              className="tunnel-layer absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${services[0].bgAsset}')`,
                filter: `brightness(${0.4 + i * 0.15})`,
                maskImage: i === 3 ? 'none' : 'radial-gradient(circle, transparent 15%, black 35%)',
                WebkitMaskImage: i === 3 ? 'none' : 'radial-gradient(circle, transparent 15%, black 35%)',
                transform: `scale(${0.5 + (i * 0.25)})`,
                transformOrigin: 'center center',
                zIndex: 4 - i,
                willChange: 'transform, opacity' 
              }}
            />
          ))}
        </div>

        {/* Slides 1 to 9 Backgrounds */}
        {services.slice(1).map((service, index) => {
          const i = index + 1;
          return (
            <div 
              key={i}
              className={`slide-bg-${i} absolute inset-0 w-full h-full ${service.bgColor} bg-cover bg-center`}
              style={{
                backgroundImage: service.bgAsset ? `url('${service.bgAsset}')` : 'none',
                clipPath: 'inset(100% 0 0 0)', // Initially hidden via clip-path
                zIndex: 10 + i
              }}
            >
              {/* Optional: Add a dark gradient overlay so text is readable once user adds real images */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
          );
        })}
      </div>

      {/* Foreground Content Container */}
      <div className="absolute inset-0 w-full h-full z-50 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-7xl mx-auto px-6 h-full">
          {services.map((service, i) => (
            <div 
              key={i} 
              className={`slide-text-${i} absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12 opacity-0`}
            >
              <div className="backdrop-blur-xl bg-sec/80 border border-white/5 p-12 md:p-16 rounded-3xl shadow-2xl max-w-3xl transform pointer-events-auto hover:bg-sec transition-colors duration-500">
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-5xl md:text-7xl font-black mb-6 tracking-tight">
                  {service.title}
                </h2>
                <p className="text-gray-300 text-xl md:text-2xl font-light leading-relaxed">
                  {service.desc}
                </p>
                <button className="mt-10 px-8 py-4 bg-acc hover:bg-acc/80 text-dom font-black rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] border-none">
                  Learn More
                </button>
              </div>

              {service.title === "Dr. Ashok Kumar Gulati" && (
                <div className="hidden md:block pointer-events-auto">
                  <TiltedCard
                    imageSrc="/assets/doctor_gulati.png"
                    altText="Dr. Ashok Kumar Gulati"
                    captionText="Dr. Ashok Kumar Gulati"
                    containerHeight="400px"
                    containerWidth="300px"
                    imageHeight="400px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
