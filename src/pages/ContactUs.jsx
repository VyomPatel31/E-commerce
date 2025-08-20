// src/pages/ContactUs.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter} from 'react-icons/fa6'
import Navbar from "../components/Navbar";

export default function ContactUs() {
  return (
    <div className="bg-gray-50 mt-0 min-h-screen ">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-200 to-gray-400 text-black py-15 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Contact Us</h1>
        <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
          We’d love to hear from you! Whether you have a question about products, pricing, or anything else, 
          our team is ready to answer all your questions.
        </p>
      </div>
      </section>

      {/* Contact Form & Info */}
      <div className="max-w-6xl mx-auto mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-700 text-white rounded-lg p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-2xl mr-3" />
              <p>support@shopeasy.com</p>
            </div>
            <div className="flex items-center mb-4">
              <FaPhone className="text-2xl mr-3" />
              <p>+91 97732 05176</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl mr-3" />
              <p>sector3, Gandhinagar, Gujarat, India</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" className="hover:text-gray-200 transition">
                <FaFacebook size={24} />
              </a>
              <a href="https://x.com/" className="hover:text-gray-200 transition">
                <FaXTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/" className="hover:text-gray-200 transition">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
