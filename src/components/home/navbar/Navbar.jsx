// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     // This page is basically for the navigation purpose which will redirect one page to another with the help of routing
//     <div className="w-full bg-white shadow-sm p-[2px]">
//       <div className="container list-none flex space-x-6 justify-end  p-4  text-[17px]">
//         <li className="text-blue-600 hover:underline  flex-grow">
//           <Link to="/home">Home</Link>
//         </li>
//         <li className="text-blue-600 hover:underline  ">
//           <Link to="/about">About</Link>
//         </li>

//         <li className="text-blue-600 hover:underline ">
//           <Link to="/services">Services</Link>
//         </li>

//         <li className="text-blue-600 hover:underline ">
//           <Link to="/contactus">Contact Us</Link>
//         </li>
//         {/* <li className="text-blue-600 hover:underline ">
//           <Link to="/help">Help</Link>
//         </li> */}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// //

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/smslogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed z-10 w-full bg-white shadow-sm h-auto py-2 flex items-center">
      <div className="container mx-auto flex items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Navigation Links (Shown on medium and larger screens) */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold list-none">
          <li className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            <Link to="/home">Home</Link>
          </li>
          <li className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            <Link to="/about">About</Link>
          </li>
          <li className="text-blue-600 hover:text-red-500 transition-colors duration-200">
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>

        {/* Hamburger Menu (Visible only on small screens) */}
        <button
          className="md:hidden text-3xl text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Dropdown Menu for Small Screens */}
        {menuOpen && (
          <ul className="absolute top-14 right-6 bg-white shadow-md rounded-md p-3 flex flex-col space-y-2 text-lg font-semibold">
            <li>
              <Link to="/home" className="block text-blue-600 hover:text-red-500" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-blue-600 hover:text-red-500" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="block text-blue-600 hover:text-red-500" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
