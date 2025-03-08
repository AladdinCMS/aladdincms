import React from "react";
import { Link } from "react-router-dom";
import SignIn from "../login/auth/signin";
import Contact from "../external/page";
import HeaderNavbar from "../../components/Header";

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-17">


            {/* Hero Section */}
            <header className="text-center py-20 bg-green-500 text-white">
                <h2 className="text-4xl font-bold">Welcome to The Green Team</h2>
                <p className="text-lg mt-4">Environmental Conservation Volunteering For Young People Aged 12-18</p>
                <Link to='/signin'>
                    <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
                        Get Started
                    </button>
                </Link>
            </header>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold text-center">Our Features</h3>
                <div className="mt-10 grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h4 className="text-xl font-bold">Fast Performance</h4>
                        <p className="mt-2 text-gray-600">Optimized for speed and efficiency.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h4 className="text-xl font-bold">Responsive Design</h4>
                        <p className="mt-2 text-gray-600">Looks great on all devices.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h4 className="text-xl font-bold">Easy to Use</h4>
                        <p className="mt-2 text-gray-600">Simple and user-friendly interface.</p>
                    </div>
                </div>
            </section>


        </div >
    );
};

export default HomePage;