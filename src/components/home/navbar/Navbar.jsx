import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // This page is basically for the navigation purpose which will redirect one page to another with the help of routing
    <div className="w-full bg-white shadow-sm p-[2px]">
      <div className="container list-none flex space-x-6 justify-end  p-4  text-[17px]">
        <li className="text-blue-600 hover:underline  flex-grow">
          <Link to="/home">Home</Link>
        </li>
        <li className="text-blue-600 hover:underline  ">
          <Link to="/about">About</Link>
        </li>

        <li className="text-blue-600 hover:underline ">
          <Link to="/services">Services</Link>
        </li>

        <li className="text-blue-600 hover:underline ">
          <Link to="/contactus">Contact Us</Link>
        </li>
        {/* <li className="text-blue-600 hover:underline ">
          <Link to="/help">Help</Link>
        </li> */}
      </div>
    </div>
  );
};

export default Navbar;
