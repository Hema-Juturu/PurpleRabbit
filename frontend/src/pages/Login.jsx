import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  loginUser,
  registerUser
} from "../features/auth/authSlice.js";
import ResponseModal from "../Components/ResponseModal.jsx";
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, csetPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (password !== cpassword) {
        setModalData({
          title: "Error",
          message:
            "Passwords do not match. Please check your confirmation password.",
          type: "error",
        });
        setIsModalOpen(true);
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
        const errorMessage =
          error?.message ||
          "An unexpected error occurred during authentication.";
        setModalData({
          title: "Authentication Failed",
          message: errorMessage,
          type: "error",
        });
        setIsModalOpen(true);
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
      <ResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type}
      />
    </div>
  );
};

export default Login;
