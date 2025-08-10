import Home from "../assets/Home.png"
import Trending from "../assets/Trending.png"
import Categories from "../assets/Categories.png"
import profile from "../assets/profile.png";
import help from "../assets/help.png"

const Footer = () => {
  return (
    <div className="md:hidden flex flex-row justify-between mx-6 my-3 bg-red ">
      <button>
        <img src={Home} className="w-8"/>
      </button>
      <button>
        <img src={Trending} className="w-8"/>
      </button>
      <button>
        <img src={Categories} className="w-8"/>
      </button>
         <button>
        <img src={profile} className="w-8"/>
      </button>
      <button>
        <img src={help} className="w-8"/>
      </button>
    </div>
  );
};
export default Footer;
