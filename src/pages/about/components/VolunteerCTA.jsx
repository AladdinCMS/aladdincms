"use client"

import { useState } from "react"

function VolunteerCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    interest: "",
  })
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.interest) {
      setStatus("error")
      setErrorMessage("Please fill in all required fields")
      return
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    // Simulate API call
    setStatus("loading")

    // Simulate successful submission after 1 second
    setTimeout(() => {
      setStatus("success")
    }, 1000)
  }

  return (
    <section className="bg-green-600 py-16 text-white md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="rounded-xl bg-green-700 p-8 shadow-xl md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Get Involved</h2>
              <p className="mb-6 text-green-100">
                Join our community of volunteers and make a difference in your local area. Whether you have a few hours
                or a regular commitment, we'd love to have you on board.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  <span>No experience necessary - just enthusiasm</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  <span>Flexible volunteering opportunities</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  <span>Training and support provided</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  <span>Meet new people and learn new skills</span>
                </li>
              </ul>
            </div>

            <div className="w-full">
              {status === "success" ? (
                <div className="rounded-lg bg-green-600 p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-4 h-12 w-12 text-green-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3 className="mb-2 text-xl font-bold">Thank You!</h3>
                  <p className="mb-4">
                    We've received your information and will be in touch soon about volunteering opportunities in your
                    area.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle")
                      setFormData({
                        name: "",
                        email: "",
                        location: "",
                        interest: "",
                      })
                    }}
                    className="rounded-md bg-white px-4 py-2 text-green-700 hover:bg-green-100"
                  >
                    Register Another Person
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-green-600 p-6">
                  <h3 className="mb-4 text-xl font-bold">Register Your Interest</h3>

                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm">
                      Your Name <span className="text-red-300">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-green-500 bg-green-500/50 p-2 text-white placeholder:text-green-200"
                      placeholder="Enter your name"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm">
                      Email Address <span className="text-red-300">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-green-500 bg-green-500/50 p-2 text-white placeholder:text-green-200"
                      placeholder="Enter your email"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-1 block text-sm">
                      Your Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-md border border-green-500 bg-green-500/50 p-2 text-white placeholder:text-green-200"
                      placeholder="Town or city"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-1 block text-sm">
                      Area of Interest <span className="text-red-300">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleSelectChange}
                      className="w-full rounded-md border border-green-500 bg-green-500/50 p-2 text-white"
                      disabled={status === "loading"}
                    >
                      <option value="" disabled>
                        Select an area of interest
                      </option>
                      <option value="gardening">Community Gardening</option>
                      <option value="conservation">Conservation Work</option>
                      <option value="education">Environmental Education</option>
                      <option value="events">Events & Fundraising</option>
                      <option value="admin">Admin & Support</option>
                    </select>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center rounded-md bg-red-500/20 p-2 text-sm text-red-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-md bg-white px-4 py-2 text-green-700 hover:bg-green-100"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Submitting..." : "Register Now"}
                  </button>

                  <p className="text-center text-xs text-green-200">
                    By registering, you agree to our privacy policy and volunteer terms.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VolunteerCTA

