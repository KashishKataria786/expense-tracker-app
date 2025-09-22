import React, { useState } from "react";
import {
  FaUtensils,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { LogOut, PersonStandingIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Sidebar Link Component
const SidebarLink = ({ icon, label, expand, path }) => {
  const pathname = useParams();
  const router = useNavigate();

  return (
    <div
      onClick={() => router(`${path}`)}
      className={`${
        path === pathname ? "bg-gray-800 text-white" : ""
      } flex items-center ${
        expand ? "justify-start" : "justify-center"
      } gap-3 border border-gray-100 hover:text-white hover:bg-red-500 px-3 py-4  cursor-pointer transition px-6 `}
    >
      <span className="text-md">{icon}</span>
      {expand && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
};


// Sidebar Component
const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const router = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    router("/login");
  };

  return (
    <aside
      className={`flex flex-col justify-between bottom-0 left-0 z-50 h-[100vh] bg-white text-gray-700 py-6 shadow-md transition-all duration-200 ${
        expand ? "w-64 " : "w-16 px-2"
      }`}
    >
     
      <div>
         {/* Logo Section */}
        <div className="flex gap-4 items-center mb-10">
        {/* <img className="h-[55px] w-[55px] rounded-full" src="/logo.webp" alt="Logo" /> */}
        {expand && <span className="text-xl font-semibold">Expense Tracker</span>}
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        <SidebarLink
          expand={expand}
          label="Dashboard"
          icon={<MdOutlineSpaceDashboard />}
          path="/dashboard"
        />
        <SidebarLink
          expand={expand}
          icon={<FaUtensils />}
          label="Transactions"
          path="/transactions"
        />
        <SidebarLink
          expand={expand}
          icon={<FaPlusCircle />}
          label="Analytics"
          path="/analytics"
        />
        <SidebarLink
          expand={expand}
          icon={<FaClipboardList />}
          label="Reports"
          path="/reports"
        />
      </nav>
      </div>

      {/* User Section */}
      <div className="mt-10">
        {/* <HeaderAuth onLogout={handleLogout} /> */}
      </div>
    </aside>
  );
};

// Main Layout
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex sticky left-0 top-0">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-8 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
