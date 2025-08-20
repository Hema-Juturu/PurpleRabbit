import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import {
  User,
  Home,
  Flame,
  MessageCircleQuestionMark,
  LayoutGrid,
} from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className=" text-gray-900 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3">
              <img src={logo} alt="PurpleRabbit" className="w-10 h-10" />
              <span className="text-xl font-semibold text-gray-800">
                PurpleRabbit
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-800">
              Your smart e-commerce + rental platform. Buy or rent — with AI
              assistance.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-3">Quick Links</h4>
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
            <h4 className="text-gray-800 font-semibold mb-3">Follow Us</h4>
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
      <div className="bg-white fixed z-50 bottom-0 w-full left-0 md:hidden flex flex-row justify-between px-6 py-3 ">
        <button>
          <Home className="w-8 h-8 text-gray-700" />
        </button>
        <button>
          <Flame className="w-8 h-8 text-gray-700" />
        </button>
        <button>
          <LayoutGrid className="w-8 h-8 text-gray-700" />
        </button>
        <button>
          <Link to="/profile">
            <User className="w-8 h-8 text-gray-700" />
          </Link>
        </button>
        <button>
          <MessageCircleQuestionMark className="w-8 h-8 text-gray-700" />
        </button>
      </div>
    </>
  );
};
export default Footer;
