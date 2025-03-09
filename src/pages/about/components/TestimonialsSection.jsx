"use client";

import { useState } from "react";
import hamish from "../../../assets/Hamish.png"
import janet from "../../../assets/Janet.png"
import levi from "../../../assets/Levi.png"


const testimonials = [
  {
    id: 1,
    quote:
      "After working for over 30 years in the pension industry, Hamish decided he should do something more constructive and joined the Board in August 2020.\
      Hamish loves being in the outdoors, particularly cycling and hillwalking – despite an innate ability to get lost even while having a GPS, map and compass!",
    author: "Hamish Wood",
    role: "Chair",
    image: hamish,
  },
  {
    id: 2,
    quote:
      "Janet has a strong accountancy background having worked in the industry for nearly 20 years.  Janet has been the Green Team Treasurer since 2017.",
    author: "Janet Forbes",
    role: "Treasurer",
    image: janet,
  },
  {
    id: 3,
    quote:
      "Levi brings over a decade of technology experience in finance, joining the Green Team in 2023 through a corporate social impact initiative.\
      He was drawn to our mission, a commitment that aligns with his values and amplifies his dedication to supporting young people",
    author: "Levi Fletcher",
    role: "Company Secretary",
    image: levi,
  },
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            Testimonials
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What people say about us
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="relative overflow-hidden rounded-xl bg-green-50 p-6 md:p-10 h-64">
          <div className="relative w-full h-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
                  <div className="mb-6 shrink-0 md:mb-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <blockquote className="mb-4 text-lg font-medium text-gray-700 md:text-xl">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-green-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="mt-4 flex justify-center gap-4 relative -top-6">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-700 shadow-md transition-colors hover:bg-green-100"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index ? "bg-green-600 w-4" : "bg-green-300 w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-700 shadow-md transition-colors hover:bg-green-100"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
