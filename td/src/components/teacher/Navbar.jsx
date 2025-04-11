import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  let timeoutId; // Declare timeout variable

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication status
    navigate("/"); // Redirect to Login Page
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any previous timeout to prevent unintended closing
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500); // Delay closing by 500ms
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#111827] text-white flex justify-between items-center p-4 shadow-md z-40">
      {/* Logo & Name */}
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-semibold">Teacher Dashboard</h1>
      </div>

      {/* Profile & Dropdown */}
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle className="text-2xl" />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
