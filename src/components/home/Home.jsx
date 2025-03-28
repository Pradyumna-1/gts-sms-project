import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import "../../App.css";
// import { FaRegSmile } from "react-icons/fa";
// import Picker from "emoji-picker-react";
import Post from "./services/Post";

const Home = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-68 h-full bg-[#1557b3] text-white p-4 flex flex-col justify-between shadow-lg hidden md:flex">
        <ul className="space-y-3 mt-20">
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="w-full text-left bg-blue-600 hover:bg-blue-700 p-2 rounded"
            >
              Services ▼
            </button>
            {isDropdownOpen && (
              <ul className="mt-2 bg-blue-800 text-white rounded shadow-lg">
                <li>
                  <Link
                    to="/lawyerservice"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Lawyers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctorappointment"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bankingservices"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Banking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/otherservices"
                    className="block p-2 hover:bg-blue-600"
                  >
                    Others
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/help"
              className="block bg-blue-600 hover:bg-blue-700 p-2 rounded"
            >
              Help
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="mt-auto text-center pb-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white border border-red-500 rounded-md hover:bg-red-700 transition text-sm cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 flex flex-col mt-50 w-full">
        <div className="justify-center text-center -ml-130">
      <Post/>
      </div>
        {/* Footer Section */}
        <footer className="bg-[#1557b3] text-white p-6 -ml-2 -mb-10 ">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* About Section */}
            <div>
              <h2 className="text-lg font-bold mb-3">About SMS</h2>
              <p className="text-sm leading-relaxed">
                Sadha Mee Seva Lo offers a seamless connection to essential
                services like legal assistance, healthcare, banking, and more.
                We strive to make your service journey hassle-free.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-bold mb-3">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/home"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gray-300 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-lg font-bold mb-3">Contact Us</h2>
              <p className="text-sm">📞 +91-98765-43210</p>
              <p className="text-sm">✉️ support@smsplatform.com</p>
              <p className="text-sm">📍 Hyderabad, Telangana</p>
            </div>
          </div>
          <div className="text-center mt-6 text-sm">
            © 2025 Sadha Mee Seva Lo. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;