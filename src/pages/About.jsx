// src/pages/About.jsx
import React from "react";
import { FaBagShopping , FaTruckFast, FaShield, FaUsers } from "react-icons/fa6";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    
    <div className="bg-gradient-to-b from-gray-50 mt-0 to-white min-h-screen">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-200 to-gray-400 text-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            About <span className="text-yellow-300">ShopEasy</span>
          </h1>
          <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Your one-stop shop for everything you love — delivered fast, safe, and hassle-free.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1000&q=80"
            alt="ShopEasy Mission"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At <strong>ShopEasy</strong>, our mission is to bring high-quality products from
              around the world directly to your doorstep — at unbeatable prices.
              We’re committed to making online shopping enjoyable, seamless, and accessible for everyone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We focus on innovation, affordability, and top-notch customer support
              so you can shop confidently anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Shop With Us?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <FaBagShopping  className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Wide Range</h3>
              <p className="text-gray-600 text-sm">
                Thousands of products across fashion, electronics, home essentials, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <FaTruckFast className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick and reliable shipping with real-time tracking updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <FaShield className="text-red-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">
                100% safe transactions with multiple payment options.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <FaUsers className="text-purple-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-600 text-sm">
                Friendly and responsive support team available 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8">
          {[
            { name: "Dhruvil Chaudhary", role: "Founder & CEO", img: "dhruvil.jpg" },
            { name: "Vyom Patel", role: "Head of Marketing", img: "vyom.jpg" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-24 rounded-4xl mx-auto mb-4 border-2 border-blue-500"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
