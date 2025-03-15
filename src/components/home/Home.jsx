import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 px-3 py-2 bg-transparent text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition text-sm cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
