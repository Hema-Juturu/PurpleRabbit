import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
  return (
    <>
      <footer className="bg-[#111] text-softWhite py-12 px-6 rounded-t-3xl mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-brand text-gold">PurpleRabbit</h3>
            <p className="mt-2 text-sm text-gray-400">
              Stylish & Elegant — Where Fashion Meets Tech.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-purple">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="hover:text-gold transition cursor-pointer">
                Shop
              </li>
              <li className="hover:text-gold transition cursor-pointer">FAQ</li>
              <li className="hover:text-gold transition cursor-pointer">
                Support
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-lg font-semibold text-purple">Follow Us</h4>
            <div className="flex gap-4 mt-3 text-xl">
              <a href="#" className="hover:text-gold transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gold transition">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-gold transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PurpleRabbit. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
