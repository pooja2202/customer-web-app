import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import axios from "axios";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const { customer } = useCustomer();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  console.log(customer);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    // Add logout functionality here
    setShowDropdown(false);
    try {
      const token = customer?.access_token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Userprofile/logout`,
        { user_id: customer?.user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate(`/`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    isLoggedIn && (
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title Container */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="mr-2">
              <img
                src="https://epicore-app.s3.ap-south-1.amazonaws.com/logo/logo-removebg-preview.png"
                alt="Logo"
                className="w-12 h-10"
              />
            </div>
            {/* Title */}
            <h1 className="text-2xl font-semibold font-serif text-gray-200">
              Epicore
            </h1>
          </div>

          {customer && (
            <div className="relative flex items-center" ref={dropdownRef}>
              <img
                src="https://epicore-app.s3.ap-south-1.amazonaws.com/logo/logo-removebg-preview.png"
                // alt={customer.name}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white mr-2"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {/* Welcome message */}
              {/* <p className="mr-2">Welcome, {customer.name}!</p> */}
              <p className="mr-2">Welcome</p>
              {/* Dropdown icon */}
              <svg
                className="h-6 w-6 text-white cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ zIndex: 50 }} // Ensure dropdown icon stays above dropdown content
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {/* Dropdown content */}
              {showDropdown && (
                <div className="absolute right-0 mt-20 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                  <div className="py-1">
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    )
  );
};

export default Header;
