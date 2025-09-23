import { useContext, useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  FaUtensils,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { LogOut, LogOutIcon, PersonStandingIcon } from "lucide-react";
import { useLocation,useNavigate} from "react-router-dom";
import {AuthContext} from '../../context/AuthContext.jsx'


const SidebarLink = ({ icon, label, expand, path }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center cursor-pointer transition 
        ${expand ? "justify-start px-4 py-6" : "justify-center p-2"}
        ${isActive ? "bg-red-500 text-white" : "text-gray-700 hover:bg-red-500 hover:text-white"}
      `}
    >
      <span className="text-lg">{icon}</span>
      {expand && <span className="ml-3 text-sm font-medium">{label}</span>}
    </div>
  );
};


// Sidebar Component
const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const router = useNavigate();
 const { user } = useContext(AuthContext);
 console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("token");
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
          <RiMoneyDollarCircleFill className="text-red-600 text-5xl" />
        {expand && <span className="text-xl font-semibold">Expense Tracker</span>}
      </div>

      {/* Navigation */}
      <nav className="">
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
        
        <button onClick={handleLogout} className="bg-red-500 border border-red-500 hover:bg-white hover:text-red-500 text-white w-full flex gap-2 items-center  p-3"><LogOutIcon/><span>Log Out </span></button>
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
