import logo from "../assets/logo.png";
import { useState } from "react";
import profile from "../assets/profile.png";
import wishlist from "../assets/wishlist.png";
import cart from "../assets/cart.png";
import SearchBar from "./searchBar";
import search from "../assets/search.png";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="w-full px-10 py-4">
      <div className="grid md:grid-cols-3 w-full items-center md:px-10">
        {/* menu */}
        <div className="hidden md:flex md:gap-12 mx-10 ">
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
          <div className="flex flex-row justify-between">
            <img
              src={logo}
              alt="Rabbit Icon"
              className="w-12 h-auto  md:mx-8 object-contain hover:scale-110 transition"
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
        <div className="hidden  md:flex justify-end items-center gap-8">
          <img src={search} alt="search" className="w-7" />
          <img src={profile} alt="profile" className="w-7" />
          <img src={wishlist} alt="wishlist" className="w-7" />
          <img src={cart} alt="cart" className="w-7" />
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
  );
};

export default NavBar;
