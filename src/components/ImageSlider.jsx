
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
    "https://dlaqljgi7pm30.cloudfront.net/attachments/xujquwqc3zvk/78z9smp14tkq/processed/ewe3166ec17e/alt_ratio_16x9_1x_Green_Vols_Teamworking__1_.jpg?v=20230330124017",
    "https://www.greenteam.org.uk/wp-content/uploads/2022/05/Angels-hero-image-spring.jpg",
    "https://www.greenteam.org.uk/wp-content/uploads/2021/11/GT_Green-Explorers_20210509_AMP-14-scaled.jpg",
    "https://www.greenteam.org.uk/wp-content/uploads/2024/08/hero-image-thrive-boy-with-head-wreath-1024x413.jpg",
    "https://i0.wp.com/www.greenteam.org.uk/wp-content/uploads/2024/08/Nature-Play-firelighting.jpeg?resize=400%2C300&ssl=1",
    "https://www.greenteam.org.uk/wp-content/uploads/2021/11/Outdoor-Cooking-scaled.jpg",
    "https://www.greenteam.org.uk/wp-content/uploads/2021/04/Green-Wellies_2021_03_15_1600x700-1024x457.jpg",
]

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const timeoutRef = useRef(null)

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 4 ? 0 : prevIndex + 1))
        }, 3000)

        return () => {
            resetTimeout()
        }
    }, [currentIndex])

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? images.length - 4 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 4
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <h2 className="flex flex-col items-center justify-center text-4xl font-bold text-black-500 mb-8 font-figtree ">Image Gallery</h2>

            <div className="relative">
                <div className="overflow-hidden rounded-lg">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                    >
                        {images.map((src, index) => (
                            <div key={index} className="min-w-[25%] px-2">
                                <img
                                    src={src || "/placeholder.svg"}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: images.length - 4 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? "bg-primary" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </div>
    )
}
