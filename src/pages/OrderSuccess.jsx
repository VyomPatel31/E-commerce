import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, shipping, total } = location.state || {};

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No order details found.
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Navbar/>
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg mt-20 p-6">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
          🎉 Order Placed Successfully!
        </h1>

        {/* Product Details */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Product Ordered</h2>
          <div className="flex items-center gap-4">
            <img
              src={product.thumbnail || product.image || product.images?.[0]}
              alt={product.title}
              className="w-20 h-20 object-contain rounded"
            />
            <div>
              <h3 className="font-semibold text-gray-700">{product.title}</h3>
              <p className="text-gray-500">₹{product.price}</p>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
          <div className="text-gray-700 space-y-1">
            <p><span className="font-medium">Name:</span> {shipping?.name}</p>
            <p><span className="font-medium">Phone:</span> {shipping?.phone}</p>
            <p><span className="font-medium">Email:</span> {shipping?.email}</p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {shipping?.address}, {shipping?.city}, {shipping?.state} -{" "}
              {shipping?.pincode}, {shipping?.country}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p className="text-lg font-bold">Total Paid: ₹{total}</p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
