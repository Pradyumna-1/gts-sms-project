import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import AuthForm from "./components/login/AuthForm";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm users={users} setUsers={setUsers} />} />
        <Route path="/login" element={<Login users={users} />} />
        <Route path="/register" element={<Register setUsers={setUsers} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
