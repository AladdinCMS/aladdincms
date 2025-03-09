import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">Green Team</h2>
            <p className="text-white-400 mt-2">We are the green team</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to='/'

                  className="text-white hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"

                  className="text-white hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>

              </li>
              <li>
                <Link
                  to="/contact"

                  className="text-white hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            {/* Social Media Links */}
            <div className="">
              <h3 className="text-xl font-semibold text-white">Follow Us</h3>

              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-6 w-6" color="white" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" color="white" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Instagram className="h-6 w-6" color="white" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-800 transition-colors"
                >
                  <Linkedin className="h-6 w-6" color="white" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} GreenTeam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
