import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios.defaults.withCredentials = true;
          axios
            .post("http://localhost:5000/login", { email, password })
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));

          console.log(email, password);
        }}
      >
        <h2 className="text-xl font-bold text-center mb-4">Register Now</h2>
        <input
          type="email"
          className="w-full p-2 mb-4 border-b-2 border-gray-500 focus:outline-none bg-neutral-200 rounded"
          value={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border-b-2 border-gray-500 focus:outline-none bg-neutral-200 rounded"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-amber-600 text-white py-2 rounded hover:bg-violet-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
