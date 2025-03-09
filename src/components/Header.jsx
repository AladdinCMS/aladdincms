
import { useState } from "react"
import { Link } from "react-router-dom"
import DonateUs from "../pages/external/donateus/donateUs"


export default function HeaderNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <a href="/"><img src="https://www.greenteam.org.uk/wp-content/uploads/2020/05/gt-logo-landscapex2-01.png" alt="Green Team Logo" width="300" /></a>

                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
                            Home
                        </a>

                        <a href="/support" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
                            Support Us
                        </a>
                        <a href="/about" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
                            About Us
                        </a>
                        <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-green-500 transition-colors">
                            Contact Us
                        </a>
                    </nav>

                    {/* Donate Button */}
                    <div className="hidden md:block">
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md transition-colors">
                            <Link to='/donateus'>Donate</Link>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-700 hover:bg-green-500 focus:outline-none"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                    <div className="pt-2 pb-4 space-y-1 flex flex-col items-center justify-center ">
                        <a
                            href="/"
                            className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </a>

                        <a
                            href="/support"
                            className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Support Us
                        </a>
                        <a
                            href="/about"
                            className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact Us
                        </a>
                        <div className="pt-2">
                            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md transition-colors">

                                <Link to='/donateus' >
                                    Donate
                                </Link>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

