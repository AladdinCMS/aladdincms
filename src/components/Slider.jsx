// "use client"

// import { useState, useEffect, useRef } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// const images = [
//     "https://dlaqljgi7pm30.cloudfront.net/attachments/xujquwqc3zvk/78z9smp14tkq/processed/ewe3166ec17e/alt_ratio_16x9_1x_Green_Vols_Teamworking__1_.jpg?v=20230330124017",
//     "https://www.greenteam.org.uk/wp-content/uploads/2022/05/Angels-hero-image-spring.jpg",
//     "https://www.greenteam.org.uk/wp-content/uploads/2021/11/GT_Green-Explorers_20210509_AMP-14-scaled.jpg",
//     "https://www.greenteam.org.uk/wp-content/uploads/2024/08/hero-image-thrive-boy-with-head-wreath-1024x413.jpg",
//     "https://i0.wp.com/www.greenteam.org.uk/wp-content/uploads/2024/08/Nature-Play-firelighting.jpeg?resize=400%2C300&ssl=1",
//     "https://www.greenteam.org.uk/wp-content/uploads/2021/11/Outdoor-Cooking-scaled.jpg",
//     "https://www.greenteam.org.uk/wp-content/uploads/2021/04/Green-Wellies_2021_03_15_1600x700-1024x457.jpg",
// ]

// export default function ImageSlider() {
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const timeoutRef = useRef(null)

//     const resetTimeout = () => {
//         if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current)
//         }
//     }

//     useEffect(() => {
//         resetTimeout()
//         timeoutRef.current = setTimeout(() => {
//             setCurrentIndex((prevIndex) => (prevIndex === images.length - 4 ? 0 : prevIndex + 1))
//         }, 3000)

//         return () => {
//             resetTimeout()
//         }
//     }, [currentIndex])

//     const goToPrevious = () => {
//         const isFirstSlide = currentIndex === 0
//         const newIndex = isFirstSlide ? images.length - 4 : currentIndex - 1
//         setCurrentIndex(newIndex)
//     }

//     const goToNext = () => {
//         const isLastSlide = currentIndex === images.length - 4
//         const newIndex = isLastSlide ? 0 : currentIndex + 1
//         setCurrentIndex(newIndex)
//     }

//     return (
//         <div className="w-full max-w-6xl mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-6 text-center">Image Gallery</h2>

//             <div className="relative">
//                 <div className="overflow-hidden rounded-lg">
//                     <div
//                         className="flex transition-transform duration-500 ease-in-out"
//                         style={{ transform: `translateX(-${currentIndex * 25}%)` }}
//                     >
//                         {images.map((src, index) => (
//                             <div key={index} className="min-w-[25%] px-2">
//                                 <img
//                                     src={src || "/placeholder.svg"}
//                                     alt={`Slide ${index + 1}`}
//                                     className="w-full h-64 object-cover rounded-lg shadow-md"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <button
//                     onClick={goToPrevious}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
//                 >
//                     <ChevronLeft className="h-6 w-6" />
//                 </button>

//                 <button
//                     onClick={goToNext}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
//                 >
//                     <ChevronRight className="h-6 w-6" />
//                 </button>
//             </div>

//             <div className="flex justify-center mt-4">
//                 {Array.from({ length: images.length - 3 }).map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrentIndex(index)}
//                         className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? "bg-primary" : "bg-gray-300"}`}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }


"use client"

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Flower,
    Cross,
    AlertTriangle,
    Info,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    Cloud,
    Umbrella,
    Wind,
    Snowflake,
    Rainbow,
    Zap,
    Heart,
    Star,
} from "lucide-react"

// CSS Styles
const globalStyles = `
  body {
    font-family: "Figtree", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Figtree", sans-serif;
    font-weight: 600;
  }

  .font-figtree {
    font-family: "Figtree", sans-serif;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

// Toast Context
const ToastContext = createContext(undefined)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type) => {
        setToasts((prevToasts) => [...prevToasts, { id: Date.now(), message, type }])
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, [])

    return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>
}

// Dark AppCard Component (renamed from original AppCard)
export const DarkAppCard = ({ Icon, title, description, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1c1c1e] rounded-2xl p-6 shadow-lg cursor-pointer w-56"
            onClick={onClick}
        >
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#2c2c2e] flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
                <p className="text-[#8e8e93] text-sm">{description}</p>
            </div>
        </motion.div>
    )
}

// Light AppCard Component (from carousel-card.jsx)
export const AppCard = ({ Icon, title, description, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl p-6 shadow-md cursor-pointer w-64 h-72 flex flex-col justify-between transition-colors duration-300 hover:bg-gray-50"
            onClick={onClick}
        >
            <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <Icon className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 font-figtree">{title}</h2>
                <p className="text-gray-600 text-sm font-figtree font-light">{description}</p>
            </div>
            <div className="mt-4 text-green-500 text-sm font-figtree font-medium">Click Me</div>
        </motion.div>
    )
}

// Toast Components
const icons = {
    flower: Flower,
    saint: Cross,
    warning: AlertTriangle,
    info: Info,
}

const colors = {
    flower: "text-pink-500",
    saint: "text-indigo-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
}

const AnimatedToast = ({ id, message, type }) => {
    const { removeToast } = useToast()
    const Icon = icons[type]

    const handleRemove = useCallback(() => {
        removeToast(id)
    }, [id, removeToast])

    useEffect(() => {
        const timer = setTimeout(handleRemove, 3000)
        return () => clearTimeout(timer)
    }, [handleRemove])

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
            }}
            className="bg-white backdrop-blur-md rounded-2xl shadow-lg p-4 w-80 flex items-start space-x-3 mb-4"
        >
            <Icon className={`w-5 h-5 mt-0.5 ${colors[type]}`} />
            <p className="flex-1 text-sm font-medium text-gray-800 font-figtree">{message}</p>
        </motion.div>
    )
}

export const ToastContainer = () => {
    const { toasts } = useToast()

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <AnimatedToast key={toast.id} {...toast} />
                ))}
            </AnimatePresence>
        </div>
    )
}

// Carousel Component
export const Carousel = ({ items }) => {
    const carouselRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const carousel = carouselRef.current
        if (carousel) {
            carousel.addEventListener("scroll", updateScrollButtons)
            return () => carousel.removeEventListener("scroll", updateScrollButtons)
        }
    }, [carouselRef.current])

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current
            const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

            carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }

    return (
        <>
            <div className="relative w-full max-w-5xl p-8 rounded-3xl bg-white/30 backdrop-blur-xl">
                <motion.div
                    ref={carouselRef}
                    className="flex space-x-6 overflow-x-auto scrollbar-hide py-4 no-scrollbar"
                    style={{ scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none" }}
                >
                    {items.map((item, index) => (
                        <motion.div key={index} className="flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
                            <AppCard Icon={item.Icon} title={item.title} description={item.description} onClick={item.action} />
                        </motion.div>
                    ))}
                </motion.div>
                <AnimatePresence>
                    {canScrollLeft && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => scroll("left")}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg transition-colors hover:bg-white"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </motion.button>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {canScrollRight && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => scroll("right")}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg transition-colors hover:bg-white"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

// Main UI Component
const FlowersAndSaintsUI = () => {
    const { addToast } = useToast()

    const items = [
        {
            Icon: Flower,
            title: "Rose",
            description: "Symbol of love and passion",
            action: () => addToast("Roses symbolize love and passion", "flower"),
        },
        {
            Icon: Cross,
            title: "St. Francis",
            description: "Patron saint of animals and nature",
            action: () => addToast("St. Francis is known for his love of nature", "saint"),
        },
        {
            Icon: Sun,
            title: "Sunflower",
            description: "Symbol of adoration and loyalty",
            action: () => addToast("Sunflowers always face the sun", "flower"),
        },
        {
            Icon: Moon,
            title: "St. Clare",
            description: "Patron saint of television",
            action: () => addToast("St. Clare is the patron saint of television", "saint"),
        },
        {
            Icon: Cloud,
            title: "Lily",
            description: "Symbol of purity and refined beauty",
            action: () => addToast("Lilies represent purity and refined beauty", "flower"),
        },
        {
            Icon: Umbrella,
            title: "St. Patrick",
            description: "Patron saint of Ireland",
            action: () => addToast("St. Patrick is famous for banishing snakes from Ireland", "saint"),
        },
        {
            Icon: Wind,
            title: "Dandelion",
            description: "Symbol of wishes and dreams",
            action: () => addToast("Dandelions are known for granting wishes", "flower"),
        },
        {
            Icon: Snowflake,
            title: "St. Nicholas",
            description: "Patron saint of children",
            action: () => addToast("St. Nicholas is the inspiration for Santa Claus", "saint"),
        },
        {
            Icon: Rainbow,
            title: "Iris",
            description: "Symbol of hope and wisdom",
            action: () => addToast("Irises represent hope and wisdom", "flower"),
        },
        {
            Icon: Zap,
            title: "St. Barbara",
            description: "Patron saint against lightning",
            action: () => addToast("St. Barbara is invoked against lightning and fire", "saint"),
        },
        {
            Icon: Heart,
            title: "Forget-me-not",
            description: "Symbol of true love and memories",
            action: () => addToast("Forget-me-nots symbolize true love and memories", "flower"),
        },
        {
            Icon: Star,
            title: "St. Dominic",
            description: "Patron saint of astronomers",
            action: () => addToast("St. Dominic is often depicted with a star", "saint"),
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-grenn-600 to-green-300 p-8 ">
            <style>{globalStyles}</style>
            <h1 className="text-4xl font-bold text-black-500 mb-8 font-figtree">Our Programs</h1>
            <Carousel items={items} />
            <ToastContainer />
        </div>
    )
}

// Main Component
export default function Slider() {
    return (
        <ToastProvider>
            <FlowersAndSaintsUI />
        </ToastProvider>
    )
}

// For standalone usage
if (typeof document !== "undefined" && typeof window !== "undefined") {
    const mountSlider = () => {
        const container = document.getElementById("slider-root")
        if (container && !container.hasChildNodes()) {
            const root = require("react-dom/client").createRoot(container)
            root.render(<Slider />)
        }
    }

    // Mount when DOM is ready or when called
    if (document.readyState === "complete") {
        mountSlider()
    } else {
        window.addEventListener("DOMContentLoaded", mountSlider)
    }
}

