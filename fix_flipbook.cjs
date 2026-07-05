const fs = require('fs');

const file = 'F:/Get Well Clinic/GetWellClinic-3D/src/components/FlipbookHero.jsx';
let content = fs.readFileSync(file, 'utf8');

// Fix Fold 4 CTAs
content = content.replace(
  /<div ref={fold4ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">[\s\S]*?<\/div>/,
  `<div ref={fold4ActionRef} className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="text-acc text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              View Benefits
            </button>
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-sm tracking-wide text-center">
              Book Check-up
            </button>
          </div>`
);

// Fix Fold 5 Title and CTAs (which got mangled with TextPressure)
content = content.replace(
  /<TextPressure[\s\S]*?minFontSize={80}\s*\/>\s*<div ref={fold4ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">[\s\S]*?<\/div>/,
  `<h2 ref={fold5TitleRef} className="text-4xl md:text-5xl font-light text-[#F8FAFC] leading-tight mb-10 tracking-tight">
            ENT Specialists
          </h2>
          
          <div ref={fold5ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setContactModalOpen(true)} className="px-8 py-4 bg-white text-dom font-semibold rounded-sm transition-colors hover:bg-gray-200 border-none text-sm tracking-wide text-center">
              Consult Specialist
            </button>
            <button onClick={() => setServicesModalOpen(true)} className="text-white text-sm font-medium hover:text-gray-300 transition-colors border-b border-white/30 hover:border-gray-300 pb-1">
              View ENT Services
            </button>
          </div>`
);

// Fix Fold 7 CTAs (which got mangled with StarBorder meant for Fold 1)
content = content.replace(
  /<div ref={fold7ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">\s*<StarBorder[\s\S]*?<\/button>\s*<\/div>/,
  `<div ref={fold7ActionRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => setServicesModalOpen(true)} className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-[#00B3CC] border-none text-sm tracking-wide text-center">
              Care Programs
            </button>
            <button onClick={() => setContactModalOpen(true)} className="text-acc text-sm font-medium hover:text-[#00B3CC] transition-colors border-b border-acc/30 hover:border-[#00B3CC] pb-1">
              Talk to a Doctor
            </button>
          </div>`
);

// Add TextPressure to Fold 1
content = content.replace(
  /<h1 className="text-6xl md:text-\[8rem\] font-light text-\[#F8FAFC\] leading-none mb-4 tracking-tighter">\s*Get Well Clinic\s*<\/h1>/,
  `<div className="w-full h-[120px] md:h-[200px] mb-4 relative z-50 pointer-events-auto">
            <TextPressure
              text="Get Well Clinic"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#F8FAFC"
              strokeColor="#ff0000"
              minFontSize={60}
            />
          </div>`
);

// Add StarBorder to Fold 1 CTAs
content = content.replace(
  /<button \s*onClick=\{\(\) => window.open\('https:\/\/maps.app.goo.gl\/YourMapLink', '_blank'\)\}\s*className="px-8 py-4 bg-acc text-dom font-semibold rounded-sm transition-colors hover:bg-\[#00B3CC\] border-none text-sm tracking-wide shadow-lg shadow-acc\/20"\s*>\s*Get Directions\s*<\/button>\s*<button \s*onClick=\{\(\) => setContactModalOpen\(true\)\}\s*className="px-8 py-4 border border-white\/20 text-\[#F8FAFC\] font-medium rounded-sm transition-all hover:bg-white\/5 hover:border-white\/40 text-sm tracking-wide"\s*>\s*Contact Desk\s*<\/button>\s*<button \s*onClick=\{\(\) => setServicesModalOpen\(true\)\}\s*className="px-8 py-4 border border-acc\/20 text-acc font-medium rounded-sm transition-all hover:bg-acc\/5 hover:border-acc\/40 text-sm tracking-wide"\s*>\s*Discover Services\s*<\/button>/,
  `<StarBorder as="button" onClick={() => window.open('https://maps.app.goo.gl/YourMapLink', '_blank')} color="#00E5FF" speed="3s" className="px-8 py-4 bg-acc/10 text-acc font-semibold rounded-sm text-sm tracking-wide">
              Get Directions
            </StarBorder>
            
            <StarBorder as="button" onClick={() => setContactModalOpen(true)} color="#ffffff" speed="4s" className="px-8 py-4 bg-white/5 text-[#F8FAFC] font-medium rounded-sm text-sm tracking-wide">
              Contact Desk
            </StarBorder>

            <StarBorder as="button" onClick={() => setServicesModalOpen(true)} color="#00E5FF" speed="3.5s" className="px-8 py-4 bg-acc/5 text-acc font-medium rounded-sm text-sm tracking-wide">
              Discover Services
            </StarBorder>`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed FlipbookHero.jsx');
