import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { PlayIcon, Bars3Icon } from "@heroicons/react/24/solid";

export default function VideoLanding() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen text-black font-sans" style={{ backgroundColor: "#f3f4f6" }}>
            {/* Hero Section */}
            <section className="min-h-[55vh] flex flex-col items-center justify-center px-4 md:px-0">
                <div className="container mx-auto">
                    <div className="max-w-[800px] mx-auto text-center space-y-6">
                        <h1
                            className="text-3xl md:text-[56px] leading-tight md:leading-[1.1] font-medium tracking-[-0.02em] opacity-0"
                            style={{ animation: "fadeInUp 0.6s ease-out 0.2s forwards" }}
                        >
                            WANT TO FIND OUT MORE?
                        </h1>
                        <p
                            className="text-black text-base md:text-xl leading-relaxed max-w-[600px] mx-auto opacity-0"
                            style={{ animation: "fadeInUp 0.6s ease-out 0.4s forwards" }}
                        >
                            Watch the video below created by volunteer videographer, Evelyn Dom, or click on each of the programme boxes to be taken to that page for more information.
                        </p>
                        <div className="pt-8 opacity-0" style={{ animation: "fadeInUp 0.6s ease-out 0.6s forwards" }}>
                            <Button
                                className="bg-green-500 hover:bg-white text-white hover:text-green-500 rounded-full px-6 py-3 h-auto text-sm md:text-md"
                                onClick={() => {
                                    const videoSection = document.getElementById("video-section");
                                    videoSection?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Hear what we wanna say
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section
                id="video-section"
                className="pt-4 -mt-16 md:-mt-24 px-4 md:px-0 opacity-0"
                style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
            >
                <div className="container mx-auto">
                    <div className="max-w-[1000px] mx-auto">
                        {/* Browser Window Mockup */}
                        <div className="rounded-xl overflow-hidden bg-zinc-900/50 shadow-2xl border border-white/5">
                            {/* Browser Controls */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="bg-black/40 rounded-md py-1.5 px-3 text-xs text-white max-w-[300px] flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-gray-400" />
                                        greenteam.org.uk
                                    </div>
                                </div>
                            </div>

                            {/* Video/Content Area */}
                            <div className="aspect-[16/9] relative">
                                {isPlaying ? (
                                    <iframe
                                        src="https://www.youtube.com/embed/c7_rvUk3IDw"
                                        className="w-full h-full"
                                        title="An inspiring summary of our work"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        <div className="absolute inset-0">
                                            <img
                                                src="https://i.ytimg.com/vi/c7_rvUk3IDw/sddefault.jpg"
                                                alt="Weaves every interaction into a web of knowledge"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="transform transition-transform duration-200 hover:scale-110 active:scale-90">
                                            <Button
                                                size="lg"
                                                className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full p-0 bg-black/20 hover:bg-black/30 transition-all duration-200 backdrop-blur-sm flex items-center justify-center"
                                            >
                                                <PlayIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5 opacity-0" style={{ animation: "fadeIn 0.6s ease-out 1s forwards" }}>
                <div className="container mx-auto px-4">
                    <div className="text-center text-sm text-black">
                        <a
                            href="https://fuego.wtf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-white transition-colors relative group"
                        >
                            <span className="relative overflow-hidden">
                                Built by Forerunners 🔥
                            </span>
                        </a>
                    </div>
                </div>
            </footer>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; height: 0; }
                    to { opacity: 1; height: auto; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
