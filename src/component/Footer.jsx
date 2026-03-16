import React from 'react';
import { Link } from 'react-router-dom';
import { RiInstagramLine, RiTwitterLine, RiGithubLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="w-full bg-[#111a2e] border-t border-white/5 py-10 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-slate-900">
                E
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-white uppercase">
                EZ<span className="text-emerald-500">BUY</span>
              </h2>
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-xs">
              Your premier destination for next-gen gadgets and hardware. Experience seamless acquisition and global logistics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-emerald-500/50">Company</h3>
              <Link to="/" className="text-gray-500 hover:text-emerald-500 text-[11px] font-bold transition-colors">Home</Link>
              <Link to="/products" className="text-gray-500 hover:text-emerald-500 text-[11px] font-bold transition-colors">Products</Link>
              <Link to="/orders" className="text-gray-500 hover:text-emerald-500 text-[11px] font-bold transition-colors">Orders</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-emerald-500/50">Support</h3>
              <Link to="/contact" className="text-gray-500 hover:text-emerald-500 text-[11px] font-bold transition-colors">Contact Us</Link>
              <span className="text-gray-500 text-[11px] font-bold cursor-default">Privacy Policy</span>
              <span className="text-gray-500 text-[11px] font-bold cursor-default">Terms of Service</span>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col md:items-end space-y-4">
            <div className="text-left md:text-right">
              <h3 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2 text-emerald-500/50">Get In Touch</h3>
              <p className="text-emerald-500 font-bold text-sm">+91 98765 43210</p>
              <p className="text-gray-400 font-medium text-xs">support@ezbuy.com</p>
            </div>
            
            {/* <div className="flex gap-4 pt-2">
              <a href="#" className="p-2.5 bg-[#0b1120] rounded-xl text-gray-500 hover:text-emerald-500 border border-white/5 transition-all hover:border-emerald-500/30">
                <RiInstagramLine size={18} />
              </a>
              <a href="#" className="p-2.5 bg-[#0b1120] rounded-xl text-gray-500 hover:text-emerald-500 border border-white/5 transition-all hover:border-emerald-500/30">
                <RiTwitterLine size={18} />
              </a>
              <a href="#" className="p-2.5 bg-[#0b1120] rounded-xl text-gray-500 hover:text-emerald-500 border border-white/5 transition-all hover:border-emerald-500/30">
                <RiGithubLine size={18} />
              </a>
            </div> */}
          </div>
        </div>

        
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">
            &copy; 2026 EZBUY TERMINAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">EZ-Secure Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;