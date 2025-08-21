import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import CategoryPage from "./pages/CategoryPage";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext"; // ✅ toast provider
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

const AppContent = () => {
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/" element={<Home query={query} setQuery={setQuery} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/WishList" element={<WishList />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      {/* ✅ ToastProvider outside so AuthContext can use it */}
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
