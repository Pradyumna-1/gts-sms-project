import React, { useState } from "react";

const Reagister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.traget.name]: e.traget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register user", formData);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mt-6 mb-6 uppercase font-normal ">
          Register
        </h2>
        <form
          onClick={handleSubmit}
          action=""
          className="w-full flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name "
            className="w-full p-2 border border-zinc-400 rounded-sm  outline-none"
            required
            value={formData.name}
            onChange={handleChange}
          />
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
            Create Account
          </button>
          <a className="text-zinc-700 " href="/login">
            Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default Reagister;
