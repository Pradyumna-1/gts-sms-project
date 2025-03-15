import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const AuthForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser); // ✅ Debugging log
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // ✅ Prevent unnecessary redirect before auth check

  if (!user) {
    // ✅ Only show message if user was trying to access a protected route
    const showMessage = window.location.pathname !== "/login";
    return (
      <Navigate
        to="/login"
        state={{ message: showMessage ? "Login first" : "" }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default AuthForm;
