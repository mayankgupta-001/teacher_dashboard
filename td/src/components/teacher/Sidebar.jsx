import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaClipboardList, FaUserCheck, FaUpload, FaHome, FaBars, FaUserGraduate } from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed left-0 top-15 h-full bg-[#111827] text-white shadow-lg transition-all duration-300 z-50 ${
        isExpanded ? "w-60" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <FaBars className="text-xl cursor-pointer" />
        {isExpanded && <span className="text-lg font-semibold">Teacher Panel</span>}
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2">
        {[
          { to: "/teacher", icon: <FaHome />, text: "Dashboard", exact: true },
          { to: "/teacher/mark-attendance", icon: <FaUserCheck />, text: "Mark Attendance" },
          { to: "/teacher/check-class", icon: <FaChalkboardTeacher />, text: "Check Class" },
          { to: "/teacher/student-attendance", icon: <FaClipboardList />, text: "Student Attendance" },
          { to: "/teacher/upload-marks", icon: <FaUpload />, text: "Upload Marks" },
          { to: "/teacher/profile", icon: <FaUserGraduate />, text: "Profile" }

        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}  // 👈 Add `end` for exact matching
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-all mx-2 ${
                isActive ? "bg-white text-black font-bold shadow-md" : "hover:bg-gray-700 text-gray-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span className="ml-4">{item.text}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
