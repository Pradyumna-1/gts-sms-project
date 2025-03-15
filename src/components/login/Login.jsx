import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Login message if the user is try to go to home page
  const loginMessage = location.state?.message || "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, formData.email, formData.password);
  //     navigate("/home", { replace: true });
  //   } catch (error) {
  //     setError("Invalid email or password");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Login successful:", userCredential.user);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mt-6 mb-6  ">Welcome</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-zinc-400 rounded-sm  outline-none"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password "
            className="w-full p-2 border border-zinc-400 rounded-sm  outline-none"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="mt-2 border-2 bg-blue-500 rounded-md text-white  py-2 hover:bg-sky-500 "
            type="submit"
          >
            Login
          </button>

          <Link className="text-zinc-700" to="/register">
            Register
          </Link>
        </form>
        {/* error message if the user enter wrong email or password */}
        <div className="absolute mt-6 left-1/2 transform -translate-x-1/2  px-4 py-2 text-red-500">
          {error}
          
          {/* Show login message if redirected from AuthForm */}
          {loginMessage && (
            <p className="text-red-500 text-center ">{loginMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
