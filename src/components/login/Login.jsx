import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ users }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (user) {
      navigate("/home");
    } else {
      setError("Something went wrong. Invalid email or password.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mt-6 mb-6 u  ">Welcome</h2>
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-full flex flex-col gap-4"
        >
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
          {/* <a className="text-zinc-700 " href="/register">
            Register
          </a> */}
          <Link className="text-zinc-700" to="/register">
            Register
          </Link>
        </form>
        <div className="absolute mt-6 left-1/2 transform -translate-x-1/2  px-4 py-2 text-red-500">
          {error}
        </div>
      </div>
    </div>
  );
};

export default Login;
