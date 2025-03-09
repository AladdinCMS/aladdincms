"use client"

import { useState, useEffect, useRef } from "react"

const timelineEvents = [
  {
    year: 1995,
    title: "Foundation and Early Years",
    description:
      "Founded by Peter Wright in Edinburgh, Scotland\
       Started as a small initiative to connect young people with nature\
       Early activities focused on environmental volunteering and outdoor education"},
  {
    year: 2000,
    title: "First Structured Volunteer Programs",
    description: "The Green Shoots and Green Explorers programs were introduced, giving young people opportunities to participate in hands-on environmental projects.",
  },
  {
    year: 2003,
    title: "Official Recognition & Charity Status",
    description: "The Green Team was officially registered as a charity, securing its status as a recognized environmental organization. This milestone allowed for increased funding opportunities and program expansion.",
  },
  {
    year: 2005,
    title: "Corporate Volunteering Introduced",
    description: "Businesses began collaborating with The Green Team, allowing employees to participate in team-building conservation projects, strengthening ties between companies and local communities.",
  },
  {
    year: 2008 ,
    title: "Nature Play & Youth Leadership",
    description: "The Nature Play program was launched, encouraging younger children to engage with nature. Additionally, the Green Leaders initiative was introduced to train young people in environmental leadership roles.",
  },
  {
    year: "2010~2018",
    title: "First Patron,Thrive Program Launch and Skylarks Program for Care-Experienced Youth",
    description:
      "Peter Wright was named the first Patron of The Green Team, recognizing his contributions. The organization had now reached thousands of young people through its programs. Also,the Skylarks program was launched, providing outdoor experiences for young people with care experience, helping them develop confidence and skills through conservation activities.",
  },
  {
    year: 2020,
    title: "Adapting to COVID-19",
    description: "Despite the pandemic, The Green Team introduced safe outdoor activities, ensuring that young people could continue engaging with nature while following health guidelines.",
  },
  {
    year: "2025 - 30",
    title: "Years of Environmental Impact",
    description: "Marking three decades of conservation and youth engagement, The Green Team continues to expand its mission, inspiring future generations to protect Scotland’s natural environment.",
  },
]

function HistoryTimeline() {
  const [visibleItems, setVisibleItems] = useState([])
  const timelineRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.3 },
    )

    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => {
      observer.observe(item)
    })

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [])

  return (
    <section className="bg-green-800 px-4 py-16 text-white md:py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-8 w-8 text-green-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-green-600 sm:left-1/2 sm:-ml-0.5"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`timeline-item relative ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12 sm:text-right"}`}
                data-index={index}
              >
                <div
                  className={`flex items-center sm:absolute sm:top-0 ${index % 2 === 0 ? "sm:right-0" : "sm:left-0"}`}
                >
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-400 bg-green-800 transition-all duration-500 ${
                      visibleItems.includes(index) ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>

                <div
                  className={`ml-16 rounded-lg bg-green-700 p-6 shadow-xl transition-all duration-500 sm:ml-0 sm:w-[calc(50%-3rem)] ${
                    visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  } ${index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"}`}
                >
                  <span className="inline-block rounded-full bg-green-900 px-3 py-1 text-sm font-medium text-green-300">
                    {event.year}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">{event.title}</h3>
                  <p className="mt-2 text-green-100">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoryTimeline

