import React from 'react';
import { motion } from 'framer-motion';
import { RiPhoneLine, RiMailLine, RiMapPinLine, RiMessage2Line } from 'react-icons/ri';

const ContactPage = () => {
  const contactDetails = [
    {
      icon: <RiPhoneLine size={24} className="text-emerald-500" />,
      title: "Call Us",
      value: "+91 98765 43210",
      label: "System Support"
    },
    {
      icon: <RiMailLine size={24} className="text-emerald-500" />,
      title: "Email Us",
      value: "email@125.com",
      label: "Encrypted Communication"
    },
    {
      icon: <RiMapPinLine size={24} className="text-emerald-500" />,
      title: "Our Office",
      value: "123 Food Street, Sector 7G",
      label: "Neo-Bangalore, 560007"
    }
  ];

  return (
    <div className="h-screen bg-[#0b1120] text-white flex flex-col p-6 lg:p-12 overflow-hidden selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black italic"
          >
            CONTACT <span className="text-emerald-500 uppercase">Center</span>
          </motion.h1>
          <p className="text-gray-500 mt-4 font-bold uppercase text-[10px] tracking-[0.4em]">Establishing direct link to headquarters</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/*  */}
          <div className="space-y-6">
            {contactDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111a2e] border border-white/5 p-6 rounded-[2rem] flex items-center gap-6 hover:border-emerald-500/30 transition-all group"
              >
                <div className="bg-[#0b1120] p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-emerald-500 font-black uppercase text-[10px] tracking-widest mb-1">{item.title}</h3>
                  <p className="text-xl font-bold text-white leading-tight">{item.value}</p>
                  <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111a2e] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden hidden lg:block"
          >
            
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
                <RiMessage2Line size={300} />
            </div>

            <h2 className="text-2xl font-black mb-6 italic">Secure <span className="text-emerald-500">Messaging</span></h2>
            <div className="space-y-4 relative z-10">
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    Our neural link operators are standing by 24/7 to assist with your technical inquiries and order status.
                </p>
                <div className="h-[2px] w-20 bg-emerald-500"></div>
                <div className="pt-4">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Global Status</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-emerald-500">HEADQUARTERS ONLINE</span>
                    </div>
                </div>
            </div>
          </motion.div>

        </div>

        {/* FoLink */}
        <footer className="mt-12 text-center">
             <button 
                onClick={() => window.history.back()}
                className="text-gray-500 hover:text-emerald-500 transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
             >
                &larr; Return 
             </button>
        </footer>

      </div>
    </div>
  );
};

export default ContactPage;