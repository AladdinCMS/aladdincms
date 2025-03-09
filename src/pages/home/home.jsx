import React from "react";
import { Link } from "react-router-dom";

import ImageSlider from "../../components/Slider";
import Slider from "../../components/ImageSlider";
import VideoLanding from "../../components/VideoLanding";


const HomePage = () => {

    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Hero Section */}
            <header className="text-center py-20 bg-green-500 text-white bg-[url('https://www.greenteam.org.uk/wp-content/uploads/2021/05/GT_Green-Explorers_20210509_AMP-8-scaled-e1637079034745.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="  bg-transparent p-6 rounded-6 mx-10">

                    <h2 className="text-4xl font-bold">Welcome to The Green Team</h2>
                    <p className="text-lg mt-4">Environmental Conservation Volunteering For Young People Aged 12-18</p>

                </div>
                <Link to='/signin'>
                    <button className="mt-6 px-6 py-3 bg-white text-green-500 font-semibold rounded-lg shadow-md hover:bg-green-500 hover:text-white transition">
                        Get Started
                    </button>
                </Link>
            </header>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <p className="text-xl text-center pb-16">The Green Team has been successfully running programmes of outdoor activities for young people since 1995. Our programmes offer a unique blend of practical conservation tasks, outdoor fun, environmental education and personal development. We work with individuals, school groups and referring partners. There really is something for everybody.</p>

                <div className=" pb-16">
                    <div className="flex flex-col items-center justify-center min-height-70vh bg-gradient-to-br from-green-0 to-green-300 p-8">

                        <Slider />
                    </div>
                </div>

                <p className="text-xl text-center pb-16">Throughout the year we run a range of outdoor programmes for children, young people and adults to take part in. We provide positive enjoyable experiences being active in the outdoors and developing new skills. Programmes take place on different days of the week, cover different age ranges and have different aims.

                    Whether you are looking to plant trees to address climate change, explore local wild places, learn some woodland survival skills, discover more about the nature around you, make friends with a hot chocolate around a fire or just chill in a hammock we have a programme for you.</p>



                <VideoLanding />

                <ImageSlider />




            </section>


        </div >
    );
};

export default HomePage;