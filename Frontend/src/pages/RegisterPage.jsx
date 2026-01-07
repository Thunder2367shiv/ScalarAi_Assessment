import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo, setUserInfo } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const { data } = await axios.post('/api/users/register', { name, email, password });
      setUserInfo(data);
      alert("Registration Successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-md shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Your Name</label>
          <input 
            type="text" 
            placeholder="Enter your name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border border-gray-400 p-2 rounded-sm focus:border-amazon_yellow outline-none" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Email</label>
          <input 
            type="email" 
            placeholder='Enter your Email'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border border-gray-400 p-2 rounded-sm focus:border-amazon_yellow outline-none" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Password</label>
          <input 
            type="password" 
            placeholder="At least 6 characters"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border border-gray-400 p-2 rounded-sm focus:border-amazon_yellow outline-none" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Re-enter Password</label>
          <input 
            type="password" 
            placeholder=''
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full border border-gray-400 p-2 rounded-sm focus:border-amazon_yellow outline-none" 
            required 
          />
        </div>
        <button type="submit" className="amazon-button w-full font-medium py-2">
          Sign up
        </button>
      </form>
      
      <div className="mt-6 border-t pt-4 text-sm">
        <p>
          Already have an account? {' '}
          <Link to="/login" className="text-blue-700 hover:text-orange-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;