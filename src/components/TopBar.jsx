import logo from "../assets/Rabbit.png";
import search from "../assets/icons8-search-64.svg";
import heart from "../assets/icons8-heart-laces-32.png";
import cart from "../assets/icons8-cart-pulsar-line-32.png";
import profile from "../assets/icons8-profile-pulsar-line-32.png";
const TopBar = () => {
  return (
    <nav className="grid grid-cols-3 items-center p-4 sticky top-0 bg-dark z-50">
      <div className="flex flex-row-reverse">
        <img
          src={logo}
          alt="Rabbit Icon"
          className="w-6 h-auto object-contain"
        />
      </div>
      <ul className="hidden font-cursive justify-center md:flex gap-10 text-base text-yellow-500">
        <li className="cursor-pointer hover:font-semibold hover:drop-shadow-glow">
          Women
        </li>
        <li className="cursor-pointer hover:font-semibold hover:drop-shadow-glow">
          Men
        </li>
        <li className="cursor-pointer hover:font-semibold hover:drop-shadow-glow">
          Kids
        </li>
        <li className="cursor-pointer hover:font-semibold hover:drop-shadow-glow">
          Home
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
