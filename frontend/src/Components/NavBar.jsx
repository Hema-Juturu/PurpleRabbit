import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Heart, ShoppingBag, LogIn } from "lucide-react";
import logo from "../assets/logo.png";
import Login from "../pages/Login";
import SearchBar from "./searchBar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice.js";
import ResponseModal from "./ResponseModal.jsx";
const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "success",
    message: "",
    type: "success",
  });
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <div className="flex items-start justify-center lg:mt-5">
      <ResponseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type}
      />
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-black/40 backdrop-blur-lg p-6 rounded-xl w-96 shadow-lg relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white/30 backdrop-blur-lg w-full items-center lg:w-3/4 lg:flex h-18 px-10 py-4 justify-between lg:rounded-full shadow-lg top-10 z-40">
        {/* Left Menu (Desktop only) */}
        <div className="hidden lg:flex gap-8 justify-start font-medium text-gray-300">
          <Link to="/women" className="hover:text-violet-900 text-lg">
            Women
          </Link>
          <Link to="/men" className="hover:text-violet-900 text-lg">
            Men
          </Link>
          <Link to="/kids" className="hover:text-violet-900 text-lg">
            Kids
          </Link>
          <Link to="/home" className="hover:text-violet-900 mr-5 text-lg">
            Home
          </Link>
        </div>

        {/* Logo */}
        <div className="hidden lg:flex lg:justify-center w-1/2">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-auto object-contain hover:scale-110 transition mr-10"
            />
          </Link>
          <SearchBar className="outline-none" />
        </div>
        {/* Mobile view*/}
        <div className="flex flex-col mt-5 lg:hidden lg:mt-0 ">
          <div className="flex flex-row mt-3 justify-between px-2 items-center">
            <div className="flex lg:justify-center">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-12 h-auto object-contain hover:scale-110 transition"
                />
              </Link>
            </div>
            {user ? (
              <div className="flex flex-row justify-end gap-4">
                {" "}
                <Link to="/wishlist">
                  <Heart className="w-6 h-6 text-gray-300 cursor-pointer hover:text-violet-600" />
                </Link>
                <Link to="/bag">
                  <ShoppingBag className="w-6 h-6 text-gray-300 cursor-pointer hover:text-violet-600" />
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-gray-300 font-semibold"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
          <div className="flex flex-row justify-evenly items-center p-4 text-gray-300">
            <Link to="/women">
              <span>Women</span>
            </Link>
            <Link to="/kids">
              <span>Kids</span>
            </Link>
            <Link to="/men">
              <span>Men</span>
            </Link>
            <Link to="/home">
              <span>Home</span>
            </Link>
          </div>

          <div className="flex mt-3 px-2">
            <SearchBar className="w-full" />
          </div>
        </div>
        {/* Right Side (Desktop only) */}
        <div className="hidden lg:flex items-center gap-6 justify-items-end ml-3">
          {/* <SearchBar className="w-56 rounded-full border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none" /> */}
          {user ? (
            <>
              {" "}
              <Link to="/profile">
                <User className="w-6 h-6  text-gray-300 cursor-pointer hover:text-violet-600" />
              </Link>
              <Link to="/wishlist">
                <Heart className="w-6 h-6 text-gray-300 cursor-pointer hover:text-violet-600" />
              </Link>
              <Link to="/bag">
                <ShoppingBag className="w-6 h-6 text-gray-300 cursor-pointer hover:text-violet-600" />
              </Link>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center justify-end justify-items-end justify-self-end gap-2 text-gray-300 font-semibold px-4 py-2 rounded-full border border-gray-300 hover:border-y-2"
            >
              <LogIn className="w-5 h-5" />
              <span>LogIn</span>
            </button>
          )}
        </div>
        {/* </div> */}
      </nav>
    </div>
  );
};

export default NavBar;
