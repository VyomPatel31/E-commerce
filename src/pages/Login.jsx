import React,{useState} from 'react'
import {useNavigate ,Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const Login = () => {
   const { login } = useAuth();
   const navigate = useNavigate();
   const [form, setForm] = useState({ email: "", password: "", });

   const {email, password} = form

   const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email,password);
    if(result.success){
        if(result.role == "admin") {
            navigate("/admin")
        } else {
            navigate("/")
        }
    } else {
        alert("Invalid Credentials")
    }
   };
  return (
     <div className=" max-w-md mx-auto mt-50 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 shadow-md bg-white p-8"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded-lg focus:ring-1"
          value={email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded-lg focus:ring-1"
          value={password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full">
          Login
        </button>
        <p className='text-sm text-center justify-between'>Don't have account? <Link to='/signup' className='text-blue-600 text-lg'>Sign Up</Link></p>

      </form>
    </div>
  )
}

export default Login