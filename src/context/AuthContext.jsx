import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";   // ✅ import toast

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();  // ✅ get showToast

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Load active user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        ...storedUser,
        cart: storedUser.cart || [],
        wishlist: storedUser.wishlist || [],
        order: storedUser.order || [],
      });
    }

    //  Ensure at least 1 admin user exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.some((u) => u.role === "admin")) {
      const adminUser = {
        name: "Admin",
        email: "admin@shop.com",
        password: "admin123",
        role: "admin",
        cart: [],
        wishlist: [],
        order: [],
      };
      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));
    }

    setLoading(false);
  }, []);

  // ✅ Save active user when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      updateUserInUsersList(user);
    }
  }, [user]);

  // ✅ Store only light user data (IDs in cart/wishlist/order)
  const updateUserInUsersList = (updatedUser) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const lightUser = {
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      role: updatedUser.role,
      cart: (updatedUser.cart || []).map((p) => (typeof p === "object" ? p.id : p)),
      wishlist: (updatedUser.wishlist || []).map((p) =>
        typeof p === "object" ? p.id : p
      ),
      order: (updatedUser.order || []).map((p) => (typeof p === "object" ? p.id : p)),
    };

    users = users.map((u) =>
      u.email === updatedUser.email ? lightUser : u
    );
    localStorage.setItem("users", JSON.stringify(users));
  };

  // 🔹 Auth Functions
  const signup = (name, email, password, role = "user") => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      showToast("❌ Email already exists");
      return { success: false, message: "Email already exists" };
    }

    const newUser = { name, email, password, role, cart: [], wishlist: [], order: [] };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    showToast("✅ Signup successful!");
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser({
        ...foundUser,
        cart: foundUser.cart || [],
        wishlist: foundUser.wishlist || [],
        order: foundUser.order || [],
      });
      localStorage.setItem("user", JSON.stringify(foundUser));
      showToast(`✅ Welcome back, ${foundUser.name}`);
      return { success: true, role: foundUser.role };
    }
    showToast("❌ Invalid credentials");
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showToast("👋 Logged out successfully");
  };

  // 🔹 Cart Functions
  const addToCart = (product) => {
    if (!user) return;
    const updatedCart = [...(user.cart || []), product];
    setUser({ ...user, cart: updatedCart });
    showToast(`🛒 ${product.title} added to cart`);
  };

  const removeFromCart = (id) => {
    if (!user) return;
    const updatedCart = (user.cart || []).filter((item) =>
      typeof item === "object" ? item.id !== id : item !== id
    );
    setUser({ ...user, cart: updatedCart });
    showToast("🗑️ Item removed from cart");
  };

  // 🔹 Wishlist Functions
  const addToWishlist = (product) => {
    if (!user) return;
    const updatedWishlist = [...(user.wishlist || []), product];
    setUser({ ...user, wishlist: updatedWishlist });
    showToast(`❤️ ${product.title} added to wishlist`);
  };

  const removeFromWishlist = (id) => {
    if (!user) return;
    const updatedWishlist = (user.wishlist || []).filter((item) =>
      typeof item === "object" ? item.id !== id : item !== id
    );
    setUser({ ...user, wishlist: updatedWishlist });
    showToast("💔 Item removed from wishlist");
  };

  // 🔹 Orders
  const order = (product) => {
    if (!user) return;
    const updatedOrder = [...(user.order || []), product];
    setUser({ ...user, order: updatedOrder });
    showToast("📦 Order placed successfully!");
  };

  // 🔹 Admin Functions
  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  const removeUser = (email) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter((u) => u.email !== email);
    localStorage.setItem("users", JSON.stringify(users));
    showToast("🗑️ User removed");
  };

  // 🔹 Product Functions
  const getAllProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };

  const addProduct = (product) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    product.id = Date.now();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    showToast("✅ Product added");
  };

  const updateProduct = (id, updatedData) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    localStorage.setItem("products", JSON.stringify(products));
    showToast("✏️ Product updated");
  };

  const deleteProduct = (id) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    showToast("🗑️ Product deleted");
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        order,
        getAllUsers,
        removeUser,
        getAllProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
