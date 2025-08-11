import Home from "../assets/Home.png";
import Trending from "../assets/Trending.png";
import Categories from "../assets/Categories.png";
import profile from "../assets/profile.png";
import help from "../assets/help.png";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3">
              <img src={logo} alt="PurpleRabbit" className="w-10 h-10" />
              <span className="text-xl font-semibold text-white">
                PurpleRabbit
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Your smart e-commerce + rental platform. Buy or rent — with AI
              assistance.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PurpleRabbit. All rights reserved.
        </div>
      </footer>
      <div className="md:hidden flex flex-row justify-between mx-6 my-3 bg-red ">
        <button>
          <img src={Home} className="w-8" />
        </button>
        <button>
          <img src={Trending} className="w-8" />
        </button>
        <button>
          <img src={Categories} className="w-8" />
        </button>
        <button>
          <img src={profile} className="w-8" />
        </button>
        <button>
          <img src={help} className="w-8" />
        </button>
      </div>
    </>
  );
};
export default Footer;
