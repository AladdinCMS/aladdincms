"use client"

import { useState, useEffect } from "react"

const stats = [
  {
    id: "Participants",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    value: 2514,
    label: "Young Participants",
    suffix: "+",
  },
  {
    id: "Volunteers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L8 6H4v4l-4 4 4 4v4h4l4 4 4-4h4v-4l4-4-4-4V6h-4L12 2z" />
      </svg>
    ),
    value: 3882,
    label: "Hours spent by Volutneers",
    suffix: "+",
    description: "volunteer hours supporting young people or undertaking conservation tasks",
  },
  {
    id: "awards",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    value: 363,
    label: "Awards Won",
    suffix: "",
    description: "Awards earned across The John Muir Award, D of E, JASS & Hi5 award schemes",
  },
  {
    id: "years",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    value: 1000,
    suffix: "s",
    label: "of trees planted, biscuits consumed & hot chocolate drunk around the fire.",
  },
]

function ImpactStats() {
  const [counts, setCounts] = useState({})
  const [inView, setInView] = useState(false)
  const duration = 2000 // ms

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("impact-stats")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    if (!inView) return

    const initialCounts = {}
    stats.forEach((stat) => {
      initialCounts[stat.id] = 0
    })
    setCounts(initialCounts)

    let startTime = null
    let animationFrameId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      const newCounts = {}
      stats.forEach((stat) => {
        newCounts[stat.id] = Math.floor(easedProgress * stat.value)
      })
      setCounts(newCounts)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [inView])

  // Format the number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <section className="bg-green-50 py-16 md:py-24">
      <div id="impact-stats" className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            Our Impact
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making a difference together
          </h2>
          <p className="text-lg text-gray-700">
            Since 1995, we've been working with communities to create lasting environmental change.
          </p>
          <p className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">2023 Achivments</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">{stat.icon}</div>
              <div className="mb-2 text-3xl font-bold text-gray-900">
                {formatNumber(counts[stat.id] || 0)}
                {stat.suffix}
              </div>
              <div className="mb-2 text-lg font-medium text-gray-800">{stat.label}</div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactStats

