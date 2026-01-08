import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, setUserInfo } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate('/'); 
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
      setUserInfo(data);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign-In</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Email</label>
          <input type="email" value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-bold">Password</label>
          <input type="password" value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="amazon-button w-full">Sign In</button>
      </form>
      <p className="mt-4 text-sm text-center">New to Ecommerce Platform? <Link to="/register" className="text-blue-600">Create account</Link></p>
    </div>
  );
};

export default LoginPage;