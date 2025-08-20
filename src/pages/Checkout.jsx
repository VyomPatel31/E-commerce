import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get product from navigation state
  const product = location.state?.product;


  // Shipping details state
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // If no product, show empty checkout
  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-xl font-semibold">No product selected</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // If product exists, calculate price
  let subtotal = 0;
  if (product.discount > 0) {
    subtotal = Number(product.price - (product.price * product.discount) / 100) || 0;
  } else {
    subtotal = Number(product?.price) || 0;
  }

  const tax = (subtotal * 0.045).toFixed(2);
  const total = (subtotal + parseFloat(tax)).toFixed(2);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Simple validation
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.pincode) {
      alert("Please fill all required fields!");
      return;
    }

    // Pass shipping info + product to success page
    navigate("/order-success", { state: { product, shipping, total } });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Product + Shipping */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="flex items-center gap-4 border-b pb-4">
              <img
                src={product.thumbnail || product.image || product.images?.[0]}
                alt={product.title}
                className="w-24 h-24 object-contain rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-700">{product.title}</h3>
                <p className="text-gray-500">₹{product.price}</p>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={shipping.name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shipping.email}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shipping.phone}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode *"
                value={shipping.pincode}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={shipping.city}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shipping.state}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shipping.country}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <textarea
                name="address"
                placeholder="Full Address *"
                value={shipping.address}
                onChange={handleChange}
                className="border rounded px-3 py-2 sm:col-span-2"
                required
              />
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (10%):</span> <span>${tax}</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span> <span>${total}</span>
            </p>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
