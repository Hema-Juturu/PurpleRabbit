import logo from "../assets/logo.png";
import { useState } from "react";
import profile from "../assets/profile.png";
import wishlist from "../assets/wishlist.png";
import cart from "../assets/cart.png";
import SearchBar from "./searchBar";
import search from "../assets/search.png";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
// import SearchBar from "./searchBar";
const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <Login /> {/* Your login form component */}
          </div>
        </div>
      )}

      <nav className="w-full px-10 py-4">
        <div className="grid md:grid-cols-[1fr_auto_1fr] w-full items-center md:px-10">
          {/* menu */}
          <div className="hidden md:flex md:gap-12 mx-10 justify-end">
            <Link to="/women">
              <span>Women</span>
            </Link>
            <Link to="/kids">
              <span>Kids</span>
            </Link>
            <Link to="/men">
              <span>Men</span>
            </Link>
            <Link to="Home">
              <span>Home</span>
            </Link>
          </div>
          {/* logo */}
          <div className="flex justify-center flex-col">
            <div className="flex flex-row md:w-min md:justify-center justify-between">
              <img
                src={logo}
                alt="Rabbit Icon"
                className="w-12 h-auto mx-8 object-contain hover:scale-110 transition"
              />
              <div className="md:hidden flex flex-row gap-5 items-center">
                <img src={wishlist} alt="wishlist" className="w-8 h-8" />
                <img src={cart} alt="cart" className="w-8 h-8" />
              </div>
            </div>
            <div className=" md:hidden flex flex-1">
              <SearchBar className="w-full" />
            </div>
          </div>
          {/* icons*/}
          <div className="hidden  md:flex justify-start items-center gap-8">
            {/* <img src={search} alt="search" className="w-7" />
             */}
            <SearchBar className="flex flex-1" />
            {isLoggedIn ? (
              <>
                <img src={profile} alt="profile" className="w-7" />
                <img src={wishlist} alt="wishlist" className="w-7" />
                <img src={cart} alt="cart" className="w-7" />
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-amber-600 font-semibold border border-amber-600 px-4 py-2 rounded-full hover:bg-amber-50"
              >
                Register
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row mt-5 w-full justify-between md:hidden ">
          <Link to="/women">
            <span>Women</span>
          </Link>
          <Link to="/kids">
            <span>Kids</span>
          </Link>
          <Link to="/men">
            <span>Men</span>
          </Link>
          <Link to="Home">
            <span>Home</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
