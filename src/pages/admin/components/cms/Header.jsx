import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("Admin User");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for admin or super admin role
    if (Cookies.get("super admin")) {
      setUserRole("Super Admin");
    } else if (Cookies.get("admin")) {
      setUserRole("Admin");
    }
  }, []);
  
  const handleLogout = () => {
    // Remove both possible admin cookies
    Cookies.remove("admin");
    Cookies.remove("super admin");
    
    // Navigate to login page
    navigate("/admin/signIn");
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-green-600 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-white">The Green Team CMS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/admin/dashboard"
              className="text-sm font-medium text-white hover:text-green-200 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="text-sm font-medium text-white hover:text-green-200 transition-colors"
            >
              Users
            </Link>
            <Link
              to="/admin/teams"
              className="text-sm font-medium text-white hover:text-green-200 transition-colors"
            >
              Team Members
            </Link>
          </nav>

          {/* User Profile & Logout */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm text-white focus:outline-none"
              >
                <span className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center">
                  <span className="text-sm font-medium leading-none">GT</span>
                </span>
                <span className="ml-2 font-medium">{userRole}</span>
                <svg
                  className="ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                >
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                    role="menuitem"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - we can add this later if needed */}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;