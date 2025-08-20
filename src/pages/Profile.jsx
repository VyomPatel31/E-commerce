import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage (or API later)
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Please login to view profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 My Profile</h1>

        {/* User Info */}
        <section className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
        </section>

        {/* Cart Items */}
        <section className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🛒 My Cart</h2>
          {user.cart?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.cart.map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <img
                    src={item.image || item.thumbnail}
                    alt={item.title}
                    className="h-24 w-full object-contain mb-2"
                  />
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items in cart.</p>
          )}
        </section>

        {/* Wishlist Items */}
        <section className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">❤️ My Wishlist</h2>
          {user.wishlist?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.wishlist.map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <img
                    src={item.image || item.thumbnail}
                    alt={item.title}
                    className="h-24 w-full object-contain mb-2"
                  />
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items in wishlist.</p>
          )}
        </section>

        {/* Orders */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📦 My Orders</h2>
          {user.order?.length > 0 ? (
            <div
             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.order.map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <img
                    src={item.image || item.thumbnail}
                    alt={item.title}
                    className="h-24 w-full object-contain mb-2"
                  />
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Not a single order placed</p>
          )}
        </section>
      </div>
    </div>
  );
}
