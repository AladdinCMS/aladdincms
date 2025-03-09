

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
        const timer = setTimeout(handleRemove, 8000)
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
            title: "Green Volunteers",
            description: "For those aged 12-18 looking for regular weekend opportunities",
            action: () => addToast("Opportunities for 12–18-year-olds to help the environment or earn a DofE or John Muir Award through regular weekend activities", "flower"),
        },
        {
            Icon: Cross,
            title: "Skylarks",
            description: "Previously Green Angles",
            action: () => addToast("For girls aged 12-18 who are interested in making friends and having fun whilst making improvements to the natural environment", "saint"),
        },
        {
            Icon: Sun,
            title: "Green Explorers",
            description: "For those aged 8-12 who want to get involved in fun outdoor activities",
            action: () => addToast("For young people aged 8-12 who want to get involved in fun outdoor activities, experience nature and explore amazing wild places", "flower"),
        },
        {
            Icon: Moon,
            title: "Thrive",
            description: "For young people in S3 and above looking for respite from daily life through outdoor adventure",
            action: () => addToast("For young people aged 14+ looking for respite from daily life through outdoor adventure, friendships and personal support to enhance mental wellbeing", "saint"),
        },
        {
            Icon: Cloud,
            title: "Green Shoots",
            description: "For S1-S3 pupils keen to grow and develop in a safe and inclusive environment",
            action: () => addToast("For S1-S3 pupils facing challenges, seeking growth in a supportive and inclusive natural environment.", "flower"),
        },
        {
            Icon: Umbrella,
            title: "Green Schools",
            description: "Guidance & help to ensure school classes enjoy learning in nature",
            action: () => addToast("Guidance & help to ensure school classes enjoy learning in nature, with training to support teachers to enhance outdoor experiences", "saint"),
        },
        {
            Icon: Wind,
            title: "Nature Play",
            description: "An opportunity for parents/carers and their pre-school children",
            action: () => addToast("An opportunity for parents/carers and their pre-school children to learn and enjoy new activities in local green spaces through nature play", "flower"),
        },

        {
            Icon: Rainbow,
            title: "Holiday Activity",
            description: "For young people aged 8-12 years old",
            action: () => addToast("For young people aged 8-12 who are looking for new adventures, outdoor games and new friendships over the school holidays", "flower"),
        },
        {
            Icon: Zap,
            title: "Green Champions",
            description: "An opportunity for the 'Young at Heart",
            action: () => addToast("An opportunity for the ‘young at heart’ to do some practical conservation work through employee volunteering or teambuilding.", "saint"),
        },

    ]

    return (
        <div className=" pt-16  pb-16">

            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-grenn-600 to-green-300 p-8  ">
                <style>{globalStyles}</style>
                <h1 className="text-4xl font-bold text-black-500 mb-8 font-figtree">Our Programs</h1>
                <Carousel items={items} />
                <ToastContainer />
            </div>
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

