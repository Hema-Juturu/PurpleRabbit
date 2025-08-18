import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState(""); // ✅ for register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const url = isRegister
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";

    const data = isRegister
      ? { username, email, password } // include username on register
      : { email, password };

    axios
      .post(url, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">
        {isRegister ? "Register Now" : "Login"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* ✅ Username field only for Register */}
        {isRegister && (
          <input
            type="text"
            className="w-full p-2 mb-4 border-b-2 border-gray-500 focus:outline-none bg-neutral-200 rounded"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          type="email"
          className="w-full p-2 mb-4 border-b-2 border-gray-500 focus:outline-none bg-neutral-200 rounded"
          value={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full p-2 mb-4 border-b-2 border-gray-500 focus:outline-none bg-neutral-200 rounded"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-amber-600 text-white py-2 rounded hover:bg-violet-600">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      {/* Switch Register/Login */}
      <p className="text-center mt-4 text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="text-amber-600 font-semibold hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

export default Login;
