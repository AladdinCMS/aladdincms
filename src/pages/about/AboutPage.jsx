import { Link } from "react-router-dom"
import TeamSection from "./components/TeamSection"
import HistoryTimeline from "./components/HistoryTimeline"
import ImpactStats from "./components/ImpactStats"
import TestimonialsSection from "./components/TestimonialsSection"
import FundersSection from "./components/FundersSection"
import small from "../../assets/small-blue-landscape.png"
import gt_logo from "../../assets/gt-logo-landscapex2-01.png"
import Slideshow from "./components/slideshow"


function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-green-800 py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-20">
          <img
            src={gt_logo}
            alt="Green Team volunteers working"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              About Green Team
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-green-100 sm:text-xl">
              A Scotland where everyone values and can enjoy the natural environment.
            </p>
            <div className="text-sm text-green-200">
              <img src={small} alt="Registered Scottish Charity SC029212" className="h-[100px] w-[500px] mx-auto" /></div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Our Mission
              </div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Outdoor experiences that connect children and young people to nature
              </h2>
              <p className="mb-6 text-lg text-gray-700">
                Green Team is a community volunteering organization that brings people together to create, improve and
                care for their local environment. Or just enjoying spending time outside engaging in nature, having fun floating mini rafts down a river.
              </p>
              <p className="mb-8 text-lg text-gray-700">
                Our aims Through our programmes we provide lasting and positive
                life-changing experiences in three core areas: cSonnecting with nature,
                connecting with others and connecting with self.
              </p>
              <a href="https://www.greenteam.org.uk/our-programmes/" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"> 
                  Our Programs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </a>
            </div>
            {/* <div className="relative h-[400px] overflow-hidden rounded-xl shadow-xl">
              <img
                src="/placeholder.svg?height=800&width=600"
                alt="Green Team volunteers planting trees"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div> */}
            {/*Slide Show Div*/}
            <Slideshow />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <ImpactStats />

      {/* History Timeline */}
      <HistoryTimeline />

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Values Section */}
      <section className="bg-green-50 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              Our Values
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What drives our work</h2>
            <p className="text-lg text-gray-700">Our values guide everything we do and how we work with communities.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Value 1 */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold">Community-Led</h3>
              <p className="text-gray-600">
                We believe that lasting change comes from within communities. We support local people to lead
                environmental improvements in their area.
              </p>
            </div>

            {/* Value 2 */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
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
              </div>
              <h3 className="mb-3 text-xl font-bold">Inclusive</h3>
              <p className="text-gray-600">
                We welcome everyone, regardless of background, ability, or experience. We create opportunities for all
                to connect with nature and each other.
              </p>
            </div>

            {/* Value 3 */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
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
              </div>
              <h3 className="mb-3 text-xl font-bold">Sustainable</h3>
              <p className="text-gray-600">
                We take a long-term approach to environmental improvement, building skills and capacity within
                communities to care for green spaces for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Funders Section */}
      <FundersSection />
    </div>
  )
}

export default AboutPage

