// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Slider from "react-slick";

export default function Home() {
  const [query, setQuery] = useState("");
  const [prod, setProd] = useState([]);
  const { name } = useParams();

  const { products, loading, error } = useProducts(query, "");
  const { user, addToCart, addToWishlist, getAllProducts, removeFromWishlist, order } = useAuth();
  const navigate = useNavigate();

  {
    products.map((p) => {
      const finalPrice = p.discount > 0 ? (p.price - (p.price * p.discount) / 100).toFixed(2) : p.price;
    })
  }

  useEffect(() => {
    setProd(getAllProducts());
  }, [getAllProducts]);

  const categories = [
    { img: "men.png ", label: "Men's Fashion", category: "mens-shirts" },
    { img: "women.png", label: "Women's Fashion", category: "womens-dresses" },
    { img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600", label: "Mobiles/Tablets", category: "smartphones" },
    { img: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", label: "Laptops", category: "laptops" },
    { img: "H&kIcon.jpeg", label: "Home Products", category: "home-decoration" },
    { img: "bike.png", label: "Motorcycle", category: "motorcycle" },
    { img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600", label: "Furniture", category: "furniture" },
    { img: "https://images.pexels.com/photos/750952/pexels-photo-750952.jpeg?auto=compress&cs=tinysrgb&w=600", label: "Grocery", category: "groceries" },
  ];
  const banners = [
    { id: 1, image: "slider1.jpg" },
    { id: 2, image: "slider2.jpg" },
    { id: 3, image: "women.png" }
  ];

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

  // ✅ Handle Buy Now with product argument
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
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar query={query} setQuery={setQuery} />

      {/* Category Section */}
      <section className="px-4 my-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to ShopEasy
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${cat.category}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden group flex flex-col items-center p-4"
            >
              <img src={cat.img} alt={cat.label} className="h-20 w-full object-contain mb-2" />
              <h3 className="text-sm md:text-base font-semibold text-gray-700 text-center">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 my-6">
        <div className="w-full max-w-[1200px] mx-auto rounded-xl overflow-hidden shadow-lg">
          <Slider
            dots={true}
            infinite={true}
            autoplay={true}
            autoplaySpeed={2500}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={true}
          >
            {banners.map((banner) => (
              <div key={banner.id}>
                <img
                  src={banner.image}
                  alt="banner"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>


      {/* Product Section */}
      <section className="px-4 max-w-7xl mx-auto my-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>

        {/* First product list : these come from admin*/}

        {!prod.length > 0 ?
          <h3 className="text-2xl text-center text-shadow-md font-semibold mb-5">
            🎉 Sale is not live! 🎉
          </h3> : (
            <div className="shadow-md p-4 mb-6 hover:shadow-lg ">
              <h3 className="mb-5 text-2xl text-shadow-md  font-semibold text-center">🎉 Sale on the products 🎉</h3>


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-4 gap-6">
                {prod.map((p) => (
                  <div
                    className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col relative"
                    key={p.id}
                  >
                    <img
                      src={p.thumbnail || p.image}
                      alt={p.title}
                      className="h-40 w-full object-contain mb-4"
                    />
                    <h3 className="font-semibold text-base text-gray-700 line-clamp-2">{p.title}</h3>
                    <div className="flex gap-4 text-gray-600 mt-2 font-medium">
                      <p className="line-through">${p.price}</p>
                      <p className="font-bold">${(p.price - (p.price / p.discount))} ({p.discount}%off)</p>

                    </div>


                    <button onClick={() => toggleWishlist(p)} className="absolute hover:scale-120 top-4 right-4 text-xl">
                      {isInWishlist(p.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
                    </button>

                    {/* Buttons */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => (user ? addToCart(p) : alert("Please login to add to cart"))}
                        className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(p)}
                        className="flex-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          )}

        {/* Second product list */}

        <h3 className="mb-5 text-2xl text-shadow-md  font-semibold text-center">Random Products</h3>

        {loading && <p className="text-gray-500">Loading Products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}


        {!loading && !error && (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col relative"
              >
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-4"
                />
                <h3 className="font-semibold text-base text-gray-700 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-2 font-medium">${product.price}</p>

                <button onClick={() => toggleWishlist(product)} className="absolute top-4 right-4 text-xl">
                  {isInWishlist(product.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
                </button>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => (user ? addToCart(product) : alert("Please login to add to cart"))}
                    className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
