import React, { useState } from "react";
import { Menu, X, User, LogOut, Bell } from "lucide-react";  
// you can swap in icons you prefer

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* Could be an img or text logo */}
            <span className="text-2xl font-bold text-blue-800">ExpenseTracker</span>
          </div>

          {/* Middle: Nav links (desktop) */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </a>
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
              Dashboard
            </a>
            <a href="/transactions" className="text-gray-700 hover:text-blue-600 transition">
              Transactions
            </a>
            <a href="/reports" className="text-gray-700 hover:text-blue-600 transition">
              Reports
            </a>
          </nav>

          {/* Right: User & mobile menu toggle */}
          <div className="flex items-center space-x-4">
            {/* Notifications icon */}
            <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full transition">
              <Bell size={20} />
            </button>
            
            {/* User menu */}
            <div className="flex items-center space-x-2">
              <User size={20} className="text-gray-600" />
              <span className="hidden sm:block text-gray-700">John Doe</span>
              <button className="p-1 rounded-md text-gray-600 hover:text-gray-800 transition">
                <LogOut size={20} />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600 p-2 rounded"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-2 pt-4 pb-4 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Home</a>
            <a href="/dashboard" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Dashboard</a>
            <a href="/transactions" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Transactions</a>
            <a href="/reports" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Reports</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
