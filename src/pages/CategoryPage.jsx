import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function CategoryPage() {
  const { name } = useParams(); // category slug from /category/:name
  const { products, loading, error } = useProducts("", name);
  const { user, addToCart, addToWishlist,order, removeFromWishlist } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = (productId) =>
    user?.wishlist?.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    if (!user) {
      alert("Please login to manage wishlist");
      return;
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Handle Buy Now
  const handleBuyNow = (product) => {
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }
    order(product); // adds product to user's orders
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className="w-full mx-auto mt-0">
      <Navbar className="w-full mt-0" />
      <h2 className="text-3xl font-bold mb-8 mt-20 text-center text-gray-800 capitalize">
        {name.replace("-", " ")} Products
      </h2>

      {loading && <p className="  text-gray-500">Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-gray-500">No products found in this category.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition flex flex-col relative"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="h-44 w-full object-contain mb-3"
                />

                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 text-xl"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-600 hover:text-red-500" />
                  )}
                </button>
              </div>

              {/* Product Info */}
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-blue-600 font-bold mt-2 text-lg">
                ${product.price}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-2">
                <button
                  onClick={() =>
                    user
                      ? addToCart(product)
                      : alert("Please login to add to cart")
                  }
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>

                {/* ✅ Buy Now Button */}
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
                >
                  Buy Now
                </button>

              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
