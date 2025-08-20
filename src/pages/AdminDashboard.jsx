import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const {
    getAllUsers,
    removeUser,
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    isAdmin,
  } = useAuth();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    discount: "", // ✅ added
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    price: "",
    image: "",
    discount: "", // ✅ added
  });

  // Load all data when admin opens dashboard
  useEffect(() => {
    setUsers(getAllUsers());
    setProducts(getAllProducts());
  }, [getAllUsers, getAllProducts]);

  if (!isAdmin()) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h2 className="text-3xl font-bold text-red-600 bg-white px-6 py-4 rounded-xl shadow-lg">
          ❌ Access Denied - Only Admins can view this page
        </h2>
      </div>
    );
  }

  // Convert file → base64 string
  const handleImageUpload = (e, setFunc, state) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFunc({ ...state, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Add product
  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      alert("⚠️ Please fill all fields and upload image");
      return;
    }
    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      discount: Number(newProduct.discount) || 0, // ✅
    });
    setProducts(getAllProducts()); // refresh list
    setNewProduct({ title: "", price: "", image: "", discount: "" });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setProducts(getAllProducts());
  };

  // Remove user
  const handleRemoveUser = (email) => {
    removeUser(email);
    setUsers(getAllUsers());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />
      <div className="max-w-7xl mt-4 mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10 drop-shadow">
          🛠 Admin Dashboard
        </h1>

        {/* Users Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">👥 All Users</h2>
          <ul className="space-y-4">
            {users.map((u, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow hover:shadow-md transition"
              >
                <span className="text-gray-700 font-medium">
                  {u.email}{" "}
                  <span className="text-sm text-gray-500 font-normal">({u.role})</span>
                </span>
                <button
                  onClick={() => handleRemoveUser(u.email)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">📦 Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((p) => {
              const finalPrice =
                p.discount > 0
                  ? (p.price - (p.price * p.discount) / 100).toFixed(2)
                  : p.price;

              return (
                <div
                  key={p.id}
                  className="bg-gray-50 rounded-2xl shadow-md overflow-hidden p-5 flex flex-col hover:shadow-xl transition"
                >
                  {editingProduct === p.id ? (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) =>
                          setEditData({ ...editData, price: e.target.value })
                        }
                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <input
                        type="number"
                        placeholder="Discount (%)"
                        value={editData.discount}
                        onChange={(e) =>
                          setEditData({ ...editData, discount: e.target.value })
                        }
                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, setEditData, editData)
                        }
                        className="text-sm text-gray-600"
                      />
                      {editData.image && (
                        <img
                          src={editData.image}
                          alt="preview"
                          className="h-32 object-contain rounded-lg border"
                        />
                      )}
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => {
                            updateProduct(p.id, {
                              ...editData,
                              price: Number(editData.price),
                              discount: Number(editData.discount) || 0,
                            });
                            setProducts(getAllProducts());
                            setEditingProduct(null);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-40 w-full object-contain rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-lg font-bold text-gray-800">
                        {p.title}
                      </h3>

                      {p.discount > 0 ? (
                        <div>
                          <p className="text-gray-500 line-through">${p.price}</p>
                          <p className="text-green-600 font-semibold mb-4">
                            ${finalPrice} ({p.discount}% OFF)
                          </p>
                        </div>
                      ) : (
                        <p className="text-indigo-600 font-semibold mb-4">
                          ${p.price}
                        </p>
                      )}

                      <div className="mt-auto flex gap-3">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(p.id);
                            setEditData({
                              title: p.title,
                              price: p.price,
                              image: p.image,
                              discount: p.discount || 0,
                            });
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Product */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">➕ Add Product</h2>
          <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-2xl shadow-md">
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              placeholder="Discount (%)"
              value={newProduct.discount}
              onChange={(e) =>
                setNewProduct({ ...newProduct, discount: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e, setNewProduct, newProduct)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="preview"
                className="h-40 object-contain rounded-lg border"
              />
            )}
            <button
              onClick={handleAddProduct}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
