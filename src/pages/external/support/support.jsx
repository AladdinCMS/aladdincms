import React from "react";
import { Link } from "react-router-dom";
import Cards from "../../../components/ExpandingCardPage";




const SupportUs = () => {

    return (
        <div className="bg-gray-100 min-h-screen pt-1">

            {/* Hero Section */}
            <header className="text-center py-20 bg-green-500 text-white bg-[url('https://www.greenteam.org.uk/wp-content/uploads/2022/05/2021-group-image-1024x768.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="  bg-transparent p-6 rounded-6 mx-10">

                    <h2 className="text-4xl font-bold">Support Us</h2>


                </div>

            </header>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <p className="text-xl text-center pb-16">The Green Team couldn’t run all its programmes without the amazing generosity of those who support us.

                    We are always looking for people to help with fundraising, get their employer, school/university or club involved or simply make a donation to help support a young person on a Green Team programme.

                    There are lots of ways you can get involved and support us– select the most appropriate option below.</p>

                <div className=" pb-16">
                    <div className="flex flex-col items-center justify-center min-height-70vh bg-gradient-to-br from-green-0 to-green-300 p-8">
                        <Cards />
                    </div>
                </div>

                <p className="text-xl text-center pb-16">“It always feels good to give something back, and that is particularly true of supporting the Green Team – knowing what they do and how they do it means I can be sure my donation will be well spent and will make a difference”</p>

                <p className="text-lg text-center pb-16">If you’d like to support us with your time then have a look at the ‘help out’ page where you can find out more about becoming a Volunteer Leader or helping with other volunteer roles within the organisation.</p>


            </section>


        </div >
    );
};

export default SupportUs;