import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name : "" ,email: "", password: "", role: "user" });

  const {name, email, password, role } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(name, email, password, role);
    if (result.success) {
      alert("Sign Up Successfully! Please Login");
      navigate('/Login');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className=' max-w-md mx-auto  mt-50 bg-gray-200 '>
      <form onSubmit={handleSubmit} className='space-y-4 shadow-md bg-white p-8'>
        
        <h2 className='text-xl font-bold text-center '>Sign Up</h2>

        <select
          name="role"
          value={role}
          onChange={handleChange}
          className='border p-2 w-full rounded-lg focus:ring-1'
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        
        <input 
        type="text"
        name='name'
        value={name}
        placeholder='Enter Your name'
        onChange={handleChange}
        className='border p-2 w-full rounded-lg focus:ring-1'
        required
        
        />

        <input
          type="email"
          name="email"
          placeholder='Email'
          value={email}
          onChange={handleChange}
          className='border p-2 w-full rounded-lg focus:ring-1'
          required
        />

        <input
          type="password"
          name="password"
          placeholder='Password'
          value={password}
          onChange={handleChange}
          className='border p-2 w-full rounded-lg focus:ring-1'
          required
        />

        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full'>
          Sign Up
        </button>
        <p className='text-sm text-center justify-between'>already have account? <Link to='/login' className='text-blue-600 text-lg'>login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
