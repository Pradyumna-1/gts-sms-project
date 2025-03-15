import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import AuthForm from "./components/login/AuthForm";
import About from "./components/home/navbar/About";
import ContactUs from "./components/home/navbar/ContactUs";
import Services from "./components/home/navbar/Services";
import Help from "./components/home/navbar/Help";

function App() {
  // const [users, setUsers] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*Used Nested Roting for Security purpose to  not allow unauthorized user to access the page*/}
        <Route element={<AuthForm />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
