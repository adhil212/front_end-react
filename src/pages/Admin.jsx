import { useState } from "react";
import { MdPerson } from "react-icons/md";
import { Outlet, NavLink } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiListBullet,
  HiPlusCircle,
  HiSquares2X2,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";

export const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="flex min-h-screen bg-[#0F172A]">
        {/* Mobile Menu Button - Moved slightly lower to avoid overlapping fixed navbars */}
        <div className="lg:hidden fixed top-24 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-blue-500 text-white shadow-lg active:scale-95 transition-transform"
          >
            {isOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-[300px] bg-[#0F172A] transition-transform duration-300 transform 
            lg:relative lg:translate-x-0 lg:mt-0
            /* THIS IS THE FIX: Added margin-top and adjusted height for mobile */
            mt-20 h-[calc(100vh-5rem)] lg:h-screen 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Internal Sidebar Container */}
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-4 p-4 bg-[#0a0f1c] text-white rounded-2xl w-[250px] m-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2d3748]">
                <MdPerson size={24} className="text-gray-300" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold leading-tight">Administrator</h2>
                <p className="text-sm text-gray-400">System Manager</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto" onClick={() => setIsOpen(false)}>
              <NavLink to="dashboard">
                {({ isActive }) => (
                  <div className={`flex items-center gap-1 p-3 rounded-2xl w-[250px] m-4 hover:bg-[#171F3F] transition-colors ${isActive ? "bg-blue-500 text-white" : "text-[#94A3B8]"}`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full">
                      <HiSquares2X2 size={20} />
                    </div>
                    <p className="font-bold">Dashboard</p>
                  </div>
                )}
              </NavLink>

              <NavLink to="add-product">
                {({ isActive }) => (
                  <div className={`flex items-center gap-1 p-3 rounded-2xl w-[250px] m-4 hover:bg-[#171F3F] transition-colors ${isActive ? "bg-blue-500 text-white" : "text-[#94A3B8]"}`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                      <HiPlusCircle size={20} />
                    </div>
                    <p className="font-bold">Add product</p>
                  </div>
                )}
              </NavLink>

              <NavLink to="list-products">
                {({ isActive }) => (
                  <div className={`flex items-center gap-1 p-3 rounded-2xl w-[250px] m-4 hover:bg-[#171F3F] transition-colors ${isActive ? "bg-blue-500 text-white" : "text-[#94A3B8]"}`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                      <HiListBullet size={20} />
                    </div>
                    <p className="font-bold">List Products</p>
                  </div>
                )}
              </NavLink>

              <NavLink to="orders">
                {({ isActive }) => (
                  <div className={`flex items-center gap-1 p-3 rounded-2xl w-[250px] m-4 hover:bg-[#171F3F] transition-colors ${isActive ? "bg-blue-500 text-white" : "text-[#94A3B8]"}`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                      <HiOutlineShoppingBag size={20} />
                    </div>
                    <p className="font-bold">Order Management</p>
                  </div>
                )}
              </NavLink>

              <NavLink to="users">
                {({ isActive }) => (
                  <div className={`flex items-center gap-1 p-3 rounded-2xl w-[250px] m-4 hover:bg-[#171F3F] transition-colors ${isActive ? "bg-blue-500 text-white" : "text-[#94A3B8]"}`}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full ">
                      <HiOutlineUsers size={20} />
                    </div>
                    <p className="font-bold">Users</p>
                  </div>
                )}
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Content Area */}
        <div className="flex-1 h-auto overflow-x-hidden pt-20 lg:pt-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};