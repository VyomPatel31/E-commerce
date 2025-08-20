// src/pages/Cart.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { user, removeFromCart } = useAuth();

  // If no user logged in
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium text-gray-600">
          Please login to view your cart.
        </p>
      </div>
    );
  }

  // Ensure cart is always an array
  const cartItems = Array.isArray(user?.cart) ? user.cart : [];

  return (
    <div className=" w-full mx-auto text-center">
      <Navbar />
      <h1 className="text-2xl  font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 ">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white  rounded-lg p-4 shadow-sm hover:shadow-lg hover:scale-105 transition flex flex-col duration-300"
            >
              <img
                src={item.thumbnail || item.image || item.images?.[0]}
                alt={item.title || item.name}
                className="w-full h-48 object-contain rounded-md bg-white p-2"
              />
              <h2 className="mt-3 text-lg font-semibold line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-600 font-medium mt-1">₹{item.price}</p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
