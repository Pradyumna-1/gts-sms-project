import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthForm = ({ users, setUsers }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <div>
      <div>
        {isRegistering ? (
          <Register setUsers={setUsers} />
        ) : (
          <Login users={users} />
        )}
        <p className="text-center mt-4">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
