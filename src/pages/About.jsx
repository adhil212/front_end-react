import React from 'react';
import { ShoppingBag, ShieldCheck, Zap,  ArrowRight ,Eye } from 'lucide-react';

const AboutUs = () => {
    
    const Purpose=[
            { 
                icon: <ShoppingBag className="text-green-400" />, 
                title: "Our Mission", 
                desc: "To empower every individual with the technology they need to create, connect, and achieve their goals. We bridge the gap between innovation and utility." 
            },
            { 
                icon: <Eye className="text-blue-400" />, 
                title: "Our Vision", 
                desc: "To become the world's most trusted ecosystem for consumer electronics, where quality is guaranteed and customer satisfaction is the standard." 
            },
            { 
                icon: <ShieldCheck className="text-purple-400" />, 
                title: "Our Values", 
                desc: "Integrity in every transaction, passion for every product, and a relentless commitment to innovation. We prioritize people over profits." 
            }
          ]
    const founders=[
            { name: "Adhil", role: "Founder & CEO", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/960px-Black_colour.jpg" },
            
            

            
          ]
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-green-500/30">
      
      {/* HeroSection */}
      <section className="pt-28 pb-20 px-6 text-center max-w-4xl mx-auto">
        <span className="px-4 py-1.5 rounded-full border border-green-500/30 text-green-400 text-xs uppercase tracking-[0.2em] bg-green-500/5 backdrop-blur-sm">
          Future of Tech Retail
        </span>
        <h1 className="text-5xl md:text-8xl font-bold mt-8 mb-8 tracking-tight">
          Innovating Your <br />
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Digital Universe
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          At EZBUY, we don't just sell gadgets; we curate the ecosystem of tomorrow. 
          Discover the story behind the technology that powers your world.
        </p>
      </section>

      {/* StorySection */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-neutral-900 rounded-3xl overflow-hidden aspect-video flex items-center justify-center border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200" 
              alt="Tech Workspace" 
              className="opacity-50 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Established</p>
              <p className="text-2xl font-bold text-green-400 tracking-tighter">2019</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-green-400 text-sm font-mono tracking-tighter">— OUR STORY</span>
            <h2 className="text-4xl font-bold mt-3 mb-6">From <span className="italic font-light text-gray-500">Garage</span> to Global</h2>
            <div className="space-y-5 text-gray-400 leading-relaxed text-lg">
              <p>
                EZBUY began with a simple frustration: finding high-quality, authentic tech gear was harder than it should be. Our founders, two tech enthusiasts, started EZBUY in a small apartment garage.
              </p>
              <p>
                What started as a curated list of gaming peripherals has exploded into a premier destination for tech lovers worldwide. We believe that technology should be accessible, reliable, and exciting.
              </p>
              <p>
                Today, we partner with top-tier brands to bring you the cutting edge of innovation, right to your doorstep.
              </p>
            </div>
          </div>
          
          <div className="flex gap-16 pt-4">
            <div>
              <h3 className="text-4xl font-bold text-white">50k+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white">1.2k</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Products Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* PurposeSection */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Driven by <span className="text-green-400">Purpose</span></h2>
          <p className="text-gray-500">Our compass for navigating the ever-changing landscape of technology.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Purpose.map((card, idx) => (
            <div key={idx} className="group p-10 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-green-500/50 transition-all duration-500">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TeamSection */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-blue-400 text-sm font-mono">— THE BOARD</span>
            <h2 className="text-5xl font-bold mt-3">Meet the <span className="text-green-400">Experts</span></h2>
          </div>
         
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((member, idx) => (
            <div key={idx} className="group text-center md:text-left">
              <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[4/5] bg-neutral-900 border border-white/5">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <h4 className="text-xl font-bold tracking-tight">{member.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTASection */}
      <section className="py-24 px-6 max-w-5xl mx-auto pb-40">
        <div className="relative bg-neutral-900 border border-white/10 p-12 md:p-20 rounded-[3rem] overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Want to Join the <span className="text-green-400">Revolution?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                We are always looking for passionate individuals who love tech as much as we do. Check our open positions.
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all active:scale-95">
                See Careers
              </button>
            </div>
            <div className="shrink-0">
              <div className="w-24 h-24 bg-green-500/10 rounded-3xl flex items-center justify-center border border-green-500/20 rotate-12 group-hover:rotate-0 transition-transform">
                <Zap className="text-green-400" size={40} />
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[120px]"></div>
        </div>

        
        <div className="mt-32 text-center">
           <h2 className="text-4xl font-black tracking-tighter text-green-500 italic">EZBUY</h2>
           <p className="text-gray-600 text-sm mt-2">© 2026 EZBUY INC. ALL RIGHTS RESERVED.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;