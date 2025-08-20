import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const { user, removeFromWishlist, addToCart } = useAuth();

  if (!user) {
    return <p className="text-center mt-10 text-lg">Please login to view your wishlist.</p>;
  }

  const wishlistItems = user.wishlist || [];

  return (
    <div className="w-full text-center mx-auto ">
        <Navbar/>
      <h1 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <div key={index} className="rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 flex flex-col">
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title || item.name}
                className="w-full h-48 object-contain rounded-md bg-white p-2"
              />
              <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹{item.price}</p>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
