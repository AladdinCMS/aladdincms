import { useState, useEffect } from "react";

import img1 from "../../../assets/young-child-exploring-nature-cropped.png"
import img2 from "../../../assets/holiday-activity-week-outdoor-fun-cropped.png"
import img3 from "../../../assets/alt_ratio_16x9_2x_Green_Vols_Teamworking__1_.jpg"

const images = [
    img1,
    img2,
    img3,
];
/*height=800&width=600&1*/

export default function Slideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(images[currentIndex]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[400px] overflow-hidden rounded-xl shadow-xl">
            <img
                src={images[currentIndex]}
                alt="Green Team volunteers planting trees"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
        </div>
    );
}
