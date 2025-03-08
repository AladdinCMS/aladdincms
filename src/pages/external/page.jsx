import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    });

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      });
    }, 5000);

    console.log("Contact form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions about volunteering or want to get in touch? We'd love
          to hear from you. Use the form below or reach out through any of our
          contact channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Our Location
                  </h3>
                  <address className="mt-1 text-gray-600 not-italic">
                    123 Volunteer Avenue
                    <br />
                    Community Center, Suite 101
                    <br />
                    Anytown, ST 12345
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                  <p className="mt-1 text-gray-600">
                    <a
                      href="tel:+11234567890"
                      className="hover:text-blue-600 transition-colors"
                    >
                      (123) 456-7890
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Monday to Friday, 9am to 5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <p className="mt-1 text-gray-600">
                    <a
                      href="mailto:info@volunteerorg.org"
                      className="hover:text-blue-600 transition-colors"
                    >
                      info@volunteerorg.org
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    We'll respond as soon as possible
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Office Hours
                  </h3>
                  <div className="mt-1 text-gray-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-800 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Location
            </h2>
            <div className="aspect-w-16  bg-gray-200 rounded-md overflow-hidden">
              <div className="w-full bg-gray-200 rounded-md flex items-center justify-center">
                {/* <MapPin className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Map placeholder</span> */}

                <img src="https://images.pexels.com/photos/108942/pexels-photo-108942.jpeg?auto=compress&cs=tinysrgb&w=600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Our community center is conveniently located in downtown Anytown,
              with ample parking and public transportation access.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            {formStatus.submitted && (
              <div
                className={`mb-6 p-4 rounded-md ${formStatus.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
                  }`}
              >
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="privacy-policy"
                  name="privacy-policy"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="privacy-policy"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    privacy policy
                  </a>{" "}
                  and consent to being contacted.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-medium text-gray-800">
                    How quickly will I receive a response?
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    We typically respond to all inquiries within 24-48 business
                    hours.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-800">
                    Can I visit your office without an appointment?
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    While we welcome visitors, we recommend scheduling an
                    appointment to ensure someone is available to assist you.
                  </p>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-800">
                    How do I sign up to volunteer?
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    You can register as a volunteer using our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      volunteer registration form
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
