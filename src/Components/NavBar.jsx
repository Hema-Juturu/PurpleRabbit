import logo from "../assets/logo.png";
import { useState } from "react";
import profile from "../assets/profile.png";
import wishlist from "../assets/wishlist.png";
import cart from "../assets/cart.png";
import SearchBar from "./searchBar";
import search from "../assets/search.png"
const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <nav className="w-full px-10 py-4">
      <div className="grid md:grid-cols-3 w-full items-center px-10">
        {/* menu */}
        <div className="hidden md:flex md:gap-12 mx-10">
          <span>Women</span>
          <span>Kids</span>
          <span>Men</span>
          <span>Home</span>
        </div>
        {/* logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Rabbit Icon"
            className="w-12 h-auto mx-2 md:mx-8 object-contain hover:scale-110 transition"
          />
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
        <span>Women</span>
        <span>Kids</span>
        <span>Men</span>
        <span>Home</span>
      </div>
    </nav>
  );
};

export default NavBar;
