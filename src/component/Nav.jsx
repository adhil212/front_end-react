import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RiUser3Line, RiShoppingCartLine, RiCloseLine } from 'react-icons/ri'; 
import { SearchContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';



const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const cartCount = 0;

  const MenuLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Products", link: "/products" },
    { id: 3, name: "About Us", link: "/aboutus" },
    { id: 4, name: "Contact us", link: "/contact" }
  ];

  


  const handleSearch = () => {
    setSearchTerm('');
  };

  const getLinkStyles = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-wider transition-all duration-300 pb-1 border-b-2 ${
      isActive
        ? "text-emerald-400 border-emerald-400"
        : "text-gray-300 border-transparent hover:text-emerald-400"
    }`;

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 shadow-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-12">
          <NavLink to="/" className="text-2xl font-black text-white flex items-center gap-1">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg mr-2 flex items-center justify-center text-slate-900 not-italic font-black">E</div>
            <span>EZ<span className="text-emerald-500">BUY</span></span>
          </NavLink>

          <ul className="hidden md:flex items-center gap-8">
            {MenuLinks.map((item) => (
              <li key={item.id}>
                <NavLink to={item.link} className={getLinkStyles}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          
          {/* Search Bar */}
          <div className="relative group flex items-center">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search..."
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                bg-slate-800 text-slate-200 text-sm rounded-full py-2 pl-4 pr-10 outline-none 
                border border-slate-700 transition-all duration-500
                focus:border-emerald-500
                ${isSearchActive ? "w-40 lg:w-64" : "w-24 lg:w-40"}
              `}
            />       
            <button onClick={handleSearch} className="absolute right-3 text-xl text-gray-500">
              <IoMdSearch />
            </button>
          </div>

          {/* Cart Icon */}
          <NavLink to="/cart" className="relative p-2 text-gray-300 hover:text-emerald-400">
            <RiShoppingCartLine className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Login Button (Hidden on very small screens to save space) */}
          <button 
            onClick={() => navigate("/login")}
            className="hidden sm:block p-2 text-gray-300 hover:text-emerald-400 border border-slate-700 rounded-xl bg-slate-800/50"
          >
            <RiUser3Line className="text-2xl" />
          </button>

          {/* 2. Mobile Menu Toggle Button*/}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white text-3xl hover:text-emerald-400"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      {/*Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[70%] bg-slate-900 z-[70] shadow-2xl p-8 md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-emerald-500 font-black tracking-widest uppercase text-xs">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-white text-3xl">
                  <RiCloseLine />
                </button>
              </div>

              <ul className="flex flex-col gap-8">
                {MenuLinks.map((item) => (
                  <li key={item.id}>
                    <NavLink 
                      to={item.link} 
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => 
                        `text-xl font-black uppercase tracking-tighter transition-all ${
                          isActive ? "text-emerald-400" : "text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                {/* Mobile Login Link */}
                <li className="pt-8 border-t border-white/5">
                  <button 
                    onClick={() => { navigate("/login"); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 text-white font-bold"
                  >
                    <RiUser3Line className="text-emerald-500 text-2xl" /> Account / Login
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;