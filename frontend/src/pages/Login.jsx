import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  selectAuthError,
  selectIsLoading,
} from "../features/auth/authSlice.js";
const Login = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const authAction = isRegister
      ? registerUser({ name, email, password, role })
      : loginUser({ email, password });
    dispatch(authAction)
      .unwrap()
      .catch((error) => {
        console.error("❌ Auth Failed:", error);
      });
  };

  return (
    <div>
      <h2 className="text-gray-300 text-2xl text-center mb-4">
        {isRegister ? "SignUp" : "LogIn"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="relative">
            <User className="absolute top-3 left-3  text-white" />
            <input
              type="text"
              className="text-gray-300 bg-transparent w-full p-2 pl-12 mb-4 border-b-2 border-gray-500 focus:outline-none   rounded"
              value={name}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute top-3 left-3 text-white" />
          <input
            type="email"
            className="text-gray-300 bg-transparent w-full p-2 pl-12 mb-4 border-b-2 border-gray-500 focus:outline-none   rounded"
            value={email}
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-3 left-3  text-white" />
          <input
            type="password"
            className="text-gray-300 bg-transparent w-full p-2 pl-12 mb-4 border-b-2 border-gray-500 focus:outline-none   rounded"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isRegister && (
          <div className="relative">
            <User className="absolute top-3 left-3  text-white" />
            <input
              type="text"
              className="text-gray-300 bg-transparent w-full p-2 pl-12 mb-4 border-b-2 border-gray-500 focus:outline-none   rounded"
              value={role}
              placeholder="Enter user/admin"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        )}
        <button className="w-full border-2  border-violet-300 text-violet-300 py-2 rounded-full hover:border-x-4 hover:font-bold">
          {isRegister ? "SignUp" : "LogIn"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-300">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="text-yellow-300 text-lg hover:underline mx-2"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "LogIn" : "SignUp"}
        </button>
      </p>
    </div>
  );
};

export default Login;
