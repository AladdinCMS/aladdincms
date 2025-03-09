"use client"

import { useState } from "react"

import { Leaf, Heart, ArrowRight, CheckCircle2 } from "lucide-react"

export default function DonateUs() {
    const [donationAmount, setDonationAmount] = useState("25")
    const [isRecurring, setIsRecurring] = useState(false)
    const [customAmount, setCustomAmount] = useState("")
    const [activeTab, setActiveTab] = useState("donate")

    const handleAmountChange = (value) => {
        setDonationAmount(value)
        setCustomAmount(value === "custom" ? "" : "")
    }

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value)
    }

    const handleRecurringChange = () => {
        setIsRecurring(!isRecurring)
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">Support The Green Revolution</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Your donation helps us empower the next generation of environmental leaders. Together, we can create a
                        sustainable future for all.
                    </p>
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>100% of donations go directly to youth programs</span>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="relative h-[300px] w-full rounded-xl overflow-hidden felx flex-col justify-center" style={{ height: "60%" }}>
                        <img
                            src="https://www.greenteam.org.uk/wp-content/uploads/2020/05/Green-Volunteers-relax-on-tree-1024x385.png"
                            alt="Young people planting trees"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Donation Section */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="border border-green-100 rounded-lg p-6 bg-white shadow-sm">
                        <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                            <Heart className="h-6 w-6 text-green-500" />
                            Make Your Donation
                        </h2>

                        {/* Custom Tabs */}
                        <div className="mb-8">
                            <div className="flex border rounded-md overflow-hidden mb-6">
                                <button
                                    onClick={() => setActiveTab("donate")}
                                    className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === "donate" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Donate
                                </button>
                                <button
                                    onClick={() => setActiveTab("fundraise")}
                                    className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === "fundraise"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Fundraise
                                </button>
                            </div>

                            {activeTab === "donate" && (
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-base font-medium">Select Amount</label>
                                            <div className="flex items-center gap-2">
                                                {/* Custom Toggle Switch */}
                                                <div
                                                    onClick={handleRecurringChange}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isRecurring ? "bg-green-600" : "bg-gray-200"
                                                        } cursor-pointer`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isRecurring ? "translate-x-6" : "translate-x-1"
                                                            }`}
                                                    />
                                                </div>
                                                <label className="text-sm cursor-pointer">Monthly Donation</label>
                                            </div>
                                        </div>

                                        {/* Custom Radio Group */}
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            {["10", "25", "50", "100", "250", "custom"].map((amount) => (
                                                <div key={amount} className="relative">
                                                    <input
                                                        type="radio"
                                                        id={`amount-${amount}`}
                                                        name="donationAmount"
                                                        value={amount}
                                                        checked={donationAmount === amount}
                                                        onChange={() => handleAmountChange(amount)}
                                                        className="sr-only"
                                                    />
                                                    <label
                                                        htmlFor={`amount-${amount}`}
                                                        className={`flex h-14 items-center justify-center rounded-md border-2 ${donationAmount === amount ? "border-green-600 bg-green-50" : "border-gray-200"
                                                            } px-3 py-2 text-center text-base font-medium hover:bg-green-50 hover:border-green-300 cursor-pointer transition-colors`}
                                                    >
                                                        {amount === "custom" ? "Custom" : `$${amount}`}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        {donationAmount === "custom" && (
                                            <div className="mb-6">
                                                <label htmlFor="custom-amount" className="sr-only">
                                                    Custom Amount
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                                    <input
                                                        id="custom-amount"
                                                        type="number"
                                                        placeholder="Enter amount"
                                                        value={customAmount}
                                                        onChange={handleCustomAmountChange}
                                                        className="w-full pl-8 h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                                        min="1"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="first-name" className="block text-sm font-medium mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    id="first-name"
                                                    className="w-full h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="last-name" className="block text-sm font-medium mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    id="last-name"
                                                    className="w-full h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="w-full h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Payment Information</h3>
                                        <div>
                                            <label htmlFor="card-number" className="block text-sm font-medium mb-1">
                                                Card Number
                                            </label>
                                            <input
                                                id="card-number"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    id="expiry"
                                                    placeholder="MM/YY"
                                                    className="w-full h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                                                    CVC
                                                </label>
                                                <input
                                                    id="cvc"
                                                    placeholder="123"
                                                    className="w-full h-10 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none px-3"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg rounded-md font-medium flex items-center justify-center transition-colors">
                                        {isRecurring
                                            ? `Donate $${donationAmount === "custom" ? customAmount || "0" : donationAmount} Monthly`
                                            : `Donate $${donationAmount === "custom" ? customAmount || "0" : donationAmount} Now`}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>
                                </div>
                            )}

                            {activeTab === "fundraise" && (
                                <div className="space-y-6">
                                    <div className="text-center py-8">
                                        <Leaf className="h-12 w-12 mx-auto text-green-500 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">Start a Fundraiser</h3>
                                        <p className="text-gray-600 mb-6">
                                            Create your own fundraising campaign to support The Green Team's mission. Engage your friends,
                                            family, and community to make a bigger impact.
                                        </p>
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                                            Create Fundraiser
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-green-700 mb-4">Your Impact</h2>

                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg border border-green-100">
                                <h3 className="font-medium text-green-800 mb-2">$25 provides</h3>
                                <p className="text-gray-600">Educational materials for 5 students to learn about sustainability</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-green-100">
                                <h3 className="font-medium text-green-800 mb-2">$50 provides</h3>
                                <p className="text-gray-600">Tools and seeds for a school garden project</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-green-100">
                                <h3 className="font-medium text-green-800 mb-2">$100 provides</h3>
                                <p className="text-gray-600">A full day workshop for 20 young environmental leaders</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-green-200">
                            <h3 className="font-medium text-green-800 mb-3">Other Ways to Support</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">Volunteer your time</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">Corporate partnerships</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">In-kind donations</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="mt-16 bg-green-50 rounded-xl p-8 text-center">
                <blockquote className="max-w-3xl mx-auto">
                    <p className="text-xl italic text-gray-700 mb-4">
                        "The Green Team's programs changed my perspective on environmental issues. Now I'm leading sustainability
                        initiatives in my school and community!"
                    </p>
                    <footer className="font-medium text-green-700">— Maya, 16, Student Leader</footer>
                </blockquote>
            </div>
        </div>
    )
}

