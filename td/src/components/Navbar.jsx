import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
// import logo from "../assets/logo.png"; // Ensure the logo file is in the correct directory

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#111827] text-white flex justify-between items-center p-4 shadow-md z-40">
      {/* Logo & Name */}
      <div className="flex items-center space-x-3">
        {/* <img src={logo} alt="Logo" className="h-8 w-8" /> */}
        <h1 className="text-xl font-semibold">Teacher Dashboard</h1>
      </div>

      {/* Profile & Dropdown */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <FaUserCircle className="text-2xl" />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="block w-full px-4 py-2 hover:bg-gray-200 text-left">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
