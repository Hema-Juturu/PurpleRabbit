import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Heart, ShoppingBag, LogIn  } from "lucide-react";
import logo from "../assets/logo.png";
import Login from "../pages/Login";
import SearchBar from "./searchBar";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
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
            <Login />
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="w-full h-18 px-10 py-4 bg-white shadow-md sticky top-0 z-40">
        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center w-full">
          {/* Left Menu (Desktop only) */}
          <div className="hidden md:flex gap-8 font-medium text-gray-700">
            <Link to="/women" className="hover:text-violet-600">
              Women
            </Link>
            <Link to="/men" className="hover:text-violet-600">
              Men
            </Link>
            <Link to="/kids" className="hover:text-violet-600">
              Kids
            </Link>
            <Link to="/home" className="hover:text-violet-600">
              Home
            </Link>
          </div>

          {/* Logo */}
          <div className="hidden md:flex md:justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-auto object-contain hover:scale-110 transition"
            />
          </div>
          {/* Mobile view*/}
          <div className="flex flex-col md:hidden mt-5">
            <div className="flex flex-row mt-3 justify-between px-2 items-center">
              <div className="flex md:justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-12 h-auto object-contain hover:scale-110 transition"
                />
              </div>
              {isLoggedIn ? (
                <div className="flex flex-row justify-end">
                  <img src={Heart} alt="wishlist" className="w-8 h-8 mx-2" />
                  <img src={ShoppingBag} alt="cart" className="w-8 h-8 mx-2" />
                  <img src={User} alt="profile" className="w-8 h-8 mx-2" />
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
          <div className="hidden md:flex items-center gap-6 justify-end">
            <SearchBar className="w-56 rounded-full border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none" />
            {isLoggedIn ? (
              <>
                <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
                <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
                <ShoppingBag className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-600" />
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 text-violet-600 font-semibold px-4 py-2 rounded-full border border-violet-600 hover:border-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
