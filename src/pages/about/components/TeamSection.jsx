"use client"

import { useState } from "react"
import penny from "../../../assets/Penny.png"
import jamie from "../../../assets/Jamie.png"
import jo from "../../../assets/Jo.png"
import margon from "../../../assets/Margon.png"
import david from "../../../assets/David.png"
import sarah from "../../../assets/Sarah.png"

const teamMembers = [
  {
    id: 1,
    name: "Penny Radway",
    role: "Co-CEO",
    bio: "Penny has managed The Green Team since 2000. Previous roles include working as a Countryside Ranger and Access Officer for Stirling Council.",
    image: penny,
    link:"https://www.greenteam.org.uk/about-us/penny-radway-ceo/",
  },
  {
    id: 2,
    name: "Jamie Leitch",
    role: "Business Development Manager",
    bio: "Jamie joined us in 2019 following 20 years in the actuarial profession. As Business Development Manager he is excited to foster new relationships and partnerships to support the development of all that is great about the Green Team.",
    image: jamie,
    link:"https://www.greenteam.org.uk/about-us/jamie-leitch/",
  },
  {
    id: 3,
    name: "Jo Walton",
    role: "Admin & Communications Officer",
    bio: "Jo joined The Green Team in January 2014, to take on a new part-time role to help support our core staff and get the word out there about what we do.",
    image: jo,
    link:"https://www.greenteam.org.uk/about-us/jo-walton/",
  },
  {
    id: 4,
    name: "Margon Van Tuyl",
    role: "Green Schools and Communities Manager",
    bio: "Margon joined the Green Team in 2000 as a volunteer on the Green Volunteers programme. She has been also been on the Green Team management committee and the board of directors. ",
    image: margon,
    link:"https://www.greenteam.org.uk/about-us/margon-van-tuyl/",
  },
  {
    id: 5,
    name: "David Hughes",
    role: "Green Volunteers Co-ordinator",
    bio: "David joined the Green Team in 2016 as a volunteer and has weaved his way into the world of the Green Team by getting involved with many different roles. ",
    image: david,
    link:"https://www.greenteam.org.uk/about-us/david-hughes-green-volunteers-co-ordinator/",
  },
  {
    id: 6,
    name: "Sarah Waterfield",
    role: "Skylarks Co-ordinator",
    bio: "Sarah started volunteering with the Green Team in 2018 as a placement student with Green Angels (now called Skylarks). ",
    image: sarah,
    link:"https://www.greenteam.org.uk/about-us/sarah-waterfield/",
  },
]

function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSelectMember = (member) => {
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedMember(member)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            Our Team
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet the people behind Green Team
          </h2>
          <p className="text-lg text-gray-700">
            Our dedicated team brings together expertise in environmental conservation, community development, and
            project management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl ${
                  selectedMember?.id === member.id ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => handleSelectMember(member)}
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`flex flex-col justify-center rounded-lg border bg-white p-6 shadow-md transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {selectedMember ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <img
                      src={selectedMember.image || "/placeholder.svg"}
                      alt={selectedMember.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                    <p className="text-green-600">{selectedMember.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{selectedMember.bio}</p>
                <a href={selectedMember?.link}>
                  <button className="mt-4 inline-flex items-center rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50">
                  Full Profile
                </button>
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-12 w-12 text-gray-300"
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
                <h3 className="text-xl font-medium text-gray-600">Select a team member</h3>
                <p className="mt-2 text-sm text-gray-500">Click on a team member to view their details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection

