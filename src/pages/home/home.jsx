import React from "react";
import { Link } from "react-router-dom";

import ImageSlider from "../../components/Slider";

const HomePage = () => {
    const images = ['https://dlaqljgi7pm30.cloudfront.net/attachments/xujquwqc3zvk/78z9smp14tkq/processed/ewe3166ec17e/alt_ratio_16x9_1x_Green_Vols_Teamworking__1_.jpg?v=20230330124017',
        'https://www.greenteam.org.uk/wp-content/uploads/2022/05/Angels-hero-image-spring.jpg',
        'https://www.greenteam.org.uk/wp-content/uploads/2021/11/GT_Green-Explorers_20210509_AMP-14-scaled.jpg',
        'https://www.greenteam.org.uk/wp-content/uploads/2024/08/hero-image-thrive-boy-with-head-wreath-1024x413.jpg',
        'https://www.greenteam.org.uk/wp-content/uploads/2024/08/hero-image-shoots-1024x373.jpg',
        'https://i0.wp.com/www.greenteam.org.uk/wp-content/uploads/2024/08/Nature-Play-firelighting.jpeg?resize=400%2C300&ssl=1',
        'https://www.greenteam.org.uk/wp-content/uploads/2021/11/Outdoor-Cooking-scaled.jpg',
        'https://www.greenteam.org.uk/wp-content/uploads/2021/04/Green-Wellies_2021_03_15_1600x700-1024x457.jpg'
    ]
    return (
        <div className="bg-gray-100 min-h-screen">


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
                <h3 className="text-3xl font-bold text-center">Our Programs</h3>

                <ImageSlider />



            </section>


        </div >
    );
};

export default HomePage;