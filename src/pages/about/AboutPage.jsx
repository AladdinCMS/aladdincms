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

      {/* Footer */}
      <footer className="bg-green-900 px-4 py-12 text-green-100">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center">
                <div className="relative mr-2 h-10 w-10">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Green Team logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">Green Team</h3>
              </div>
              <p className="text-sm text-green-300">
                Empowering communities to create, improve and care for their local environment since 1998.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-green-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-green-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-green-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Get Involved
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    News
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="hover:text-white">
                    Volunteer Handbook
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Annual Reports
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Policies
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Resources for Groups
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4 text-green-400"
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
                  <span>123 Green Street, Eco Town, EC1 2AB</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4 text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="tel:01234567890" className="hover:text-white">
                    01234 567890
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4 text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:info@greenteam.org.uk" className="hover:text-white">
                    info@greenteam.org.uk
                  </a>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4 text-green-400"
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
                  <span>Mon-Fri: 9am-5pm</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-green-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Green Team. Registered Charity No. SC029212. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link to="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white">
                Terms of Use
              </Link>
              <Link to="#" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage

