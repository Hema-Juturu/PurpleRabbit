import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";

const Login = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    const data = isRegister ? { name, email, password } : { email, password };

    // 👀 Debug log
    console.log("Sending to:", url);
    console.log("Payload:", data);

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("✅ Response:", res.data);

        // Save token
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        // Call parent callback to update NavBar state
        if (onLoginSuccess) {
          onLoginSuccess(res.data.user); // pass user info if needed
        }
      })
      .catch((err) => {
        console.error("❌ Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div>
      <h2 className="text-2xl text-center mb-4">
        {isRegister ? "SignUp" : "LogIn"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full p-2 pl-10 mb-4 border-b-2 border-gray-500 focus:outline-none bg-white rounded"
              value={name}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            className="w-full p-2 pl-10 mb-4 border-b-2 border-gray-500 focus:outline-none bg-white rounded"
            value={email}
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            className="w-full p-2 pl-10 mb-4 border-b-2 border-gray-500 focus:outline-none bg-white rounded"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full border-2 border-violet-500 text-violet-500 py-2 rounded-full hover:border-x-4 hover:font-bold">
          {isRegister ? "SignUp" : "LogIn"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="text-yellow-600 text-lg hover:underline mx-2"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "LogIn" : "SignUp"}
        </button>
      </p>
    </div>
  );
};

export default Login;
