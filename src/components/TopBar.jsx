import logo from "../assets/Rabbit.png";
import search from "../assets/icons8-search-64.svg";
import heart from "../assets/icons8-heart-laces-32.png";
import cart from "../assets/icons8-cart-pulsar-line-32.png";
import profile from "../assets/icons8-profile-pulsar-line-32.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const TopBar = () => {
  return (
    // <nav className="grid grid-cols-3 sm:grid-rows-3 items-center p-4 sticky top-0 bg-dark z-50">
    <nav className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 items-center gap-4 p-4 sticky top-0 bg-dark z-50">
      <div className="flex flex-row-reverse">
        <Link to="/">
          <img
            src={logo}
            alt="Rabbit Icon"
            className="w-6 h-auto object-contain hover:scale-110 transition"
          />
        </Link>
      </div>

      <ul className="hidden font-cursive justify-center md:flex gap-10 text-base text-yellow-500">
        <li>
          <NavLink
            to="/women"
            className={({ isActive }) =>
              `cursor-pointer hover:font-semibold   ${
                isActive ? " underline" : ""
              }`
            }
          >
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/men"
            className={({ isActive }) =>
              `cursor-pointer hover:font-semibold   ${
                isActive ? "underline" : ""
              }`
            }
          >
            Men
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kids"
            className={({ isActive }) =>
              `cursor-pointer hover:font-semibold   ${
                isActive ? " underline" : ""
              }`
            }
          >
            Kids
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `cursor-pointer hover:font-semibold   ${
                isActive ? " underline" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
      </ul>

      <div className="flex justify-end items-center gap-4">
        <span className="cursor-pointer w-7">
          <img src={search} alt="search" />
        </span>
        <span className="cursor-pointer w-7">
          <img src={heart} alt="heart" />
        </span>
        <span className="cursor-pointer w-7">
          <img src={cart} alt="cart" />
        </span>
        <span className="cursor-pointer w-7">
          <img src={profile} alt="profile" />
        </span>
      </div>
    </nav>
  );
};

export default TopBar;
