import { Link } from "react-router-dom";

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
                  href="/"
                  className="text-white hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-white hover:text-white transition">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-white transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-white transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-white transition">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
