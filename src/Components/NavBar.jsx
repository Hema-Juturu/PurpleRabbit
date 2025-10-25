import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Heart, ShoppingBag, LogIn } from "lucide-react";
import logo from "../assets/logo.png";
import Login from "../pages/Login";
import SearchBar from "./searchBar";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <div className="flex items-start justify-center md:mt-5">
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <Login
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white/30 backdrop-blur-md w-full items-center md:w-3/4 md:flex h-18 px-10 py-4 justify-between md:rounded-full shadow-md top-10 z-40">
      {/* Left Menu (Desktop only) */}
        <div className="hidden md:flex gap-8 justify-start font-medium text-gray-300">
          <Link to="/women" className="hover:text-violet-600">
            Women
          </Link>
          <Link to="/men" className="hover:text-violet-600">
            Men
          </Link>
          <Link to="/kids" className="hover:text-violet-600">
            Kids
          </Link>
          <Link to="/home" className="hover:text-violet-600 mr-5">
            Home
          </Link>
        </div>

        {/* Logo */}
        <div className="hidden md:flex md:justify-center w-1/2">
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
        <div className="flex flex-col mt-5 md:hidden md:mt-0 ">
          <div className="flex flex-row mt-3 justify-between px-2 items-center">
            <div className="flex md:justify-center">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-12 h-auto object-contain hover:scale-110 transition"
                />
              </Link>
            </div>
            {isLoggedIn ? (
              <div className="flex flex-row justify-end gap-4">
                {" "}
                <Link to="/wishlist">
                  <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
                </Link>
                <Link to="/bag">
                  <ShoppingBag className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 text-violet-600 font-semibold"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
          <div className="flex flex-row justify-between items-center p-4">
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
        <div className="hidden md:flex items-center gap-6 justify-items-end">
          {/* <SearchBar className="w-56 rounded-full border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none" /> */}
          {isLoggedIn ? (
            <>
              {" "}
              <Link to="/profile">
                <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
              </Link>
              <Link to="/wishlist">
                <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
              </Link>
              <Link to="/bag">
                <ShoppingBag className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
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
