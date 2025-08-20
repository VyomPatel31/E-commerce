import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ query, setQuery }) => {
  const { user, logout } = useAuth(); 

  const getFirstLetter = () => {
    if (!user) return "";
    const letter = user.email ? user.email.charAt(0) : user.name?.charAt(0);
    return letter ? letter.toUpperCase() : "";
  };



  const cartCount = Array.isArray(user?.cart) ? user.cart.length : 0;
  const wishlistCount = Array.isArray(user?.wishlist) ? user.wishlist.length : 0;

  return (
    <div className='w-full flex mt-0 justify-between bg-white shadow-md p-2 items-center'>
      {/* Logo */}
      <div className='flex items-center'>
        <img
          className='w-auto h-14 object-contain bg-transparent'
          src="/logo.png"
          alt="logo"
        />
        <span className="ml-2 text-xl font-bold text-gray-800">ShopEasy</span>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder='Search here'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='outline rounded-lg mr-15 w-120 h-8 focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Menu Links */}
      <div className='flex'>
        <ul className='space-x-7 text-gray-800 font-semibold flex text-xl'>
          <li className='mt-1'>
            <Link to='/'>Home</Link>
          </li>
          <li className='mt-1'>
            <Link to='/about'>About</Link>
          </li>
          <li className='mt-1'>
            <Link to='/contactUs'>Contact Us</Link>
          </li>
          <li className='relative mt-1'>
            <Link to='/cart' className='flex items-center'>
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          <li className='relative mt-1'>
            <Link to='/wishlist' className='flex items-center'>
              <FaRegHeart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className='space-x-3 flex'>
        {user ? (
          <>
            <Link 
            to= '/profile'
            className='bg-red-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg'
            title= {user.email || user.name}
            >
              {getFirstLetter()}
            
             
            </Link>
            
            <button
              onClick={logout}
              className='bg-red-400 rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to='/Login'
              className='bg-blue-400 rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200'
            >
              Sign In
            </Link>
            <Link
              to='/SignUp'
              className='bg-blue-400 rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200'
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
