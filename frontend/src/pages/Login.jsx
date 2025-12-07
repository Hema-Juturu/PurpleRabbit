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

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, csetPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (password !== cpassword) {
        setClientError("Passwords do not match.");
        return;
      }
    }
    const role = admin ? "admin" : "user";
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
              required
              placeholder="Enter username"
              minLength={3}
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
            required
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
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isRegister && (
          <div className="relative">
            <div className="relative">
              <Lock className="absolute top-3 left-3  text-white" />
              <input
                type="password"
                className="text-gray-300 bg-transparent w-full p-2 pl-12 mb-4 border-b-2 border-gray-500 focus:outline-none   rounded"
                value={cpassword}
                placeholder="Confirm password"
                required
                onChange={(e) => csetPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4 w-full">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="ml-4 w-5 h-5 border border-default-medium  hover:scale-110 transition hover:ring-2 hover:ring-red-600"
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-4 select-none ms-2 text-base font-medium text-heading text-white"
              >
                Register as a Seller
              </label>
            </div>
          </div>
        )}
        {/* Error Display */}
        {(clientError || authError) && (
          <div className="flex items-center p-3 text-sm text-red-400 bg-red-900/30 border border-red-700 rounded-lg">
            **Error:** {clientError || authError}
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
