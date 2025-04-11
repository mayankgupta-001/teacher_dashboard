import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaCalendarAlt, FaComments, FaUserGraduate } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FiMenu } from "react-icons/fi"; // 3-line menu icon

const StudentSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  let collapseTimeout;

  // Logout Function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userType");
      navigate("/");
    }
  };

  return (
    <div
      className={`fixed left-0 top-15 h-full bg-blue-600 text-white shadow-lg transition-all duration-500 ease-in-out z-50 ${
        isExpanded ? "w-48" : "w-16"
      }`}
      onMouseEnter={() => {
        clearTimeout(collapseTimeout);
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        collapseTimeout = setTimeout(() => setIsExpanded(false), 500);
      }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4 border-b bg-blue-600">
        <FiMenu className="text-2xl cursor-pointer" />
        {isExpanded && <span className="ml-4 text-lg font-semibold">Student Panel</span>}
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2">
        {[
          { to: "/student", icon: <FaHome />, text: "Dashboard", exact: true },
          { to: "/student/subjects", icon: <FaBook />, text: "Subjects" },
          { to: "/student/attendance", icon: <FaCalendarAlt />, text: "Attendance" },
          { to: "/student/messages", icon: <FaComments />, text: "Messages" },
          { to: "/student/profile", icon: <FaUserGraduate />, text: "Profile" }
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-all mx-3 ${
                isActive
                  ? "bg-white text-blue-600 font-bold shadow-md"
                  : "hover:bg-blue-400 text-white"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span className="ml-4 text-sm">{item.text}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 w-full">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 mx-3 text-red-500 hover:text-red-700 transition-all"
        >
          <span className="text-xl"><IoMdLogOut /></span>
          {isExpanded && <span className="ml-4 text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
