import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Menu, LogOut, User } from 'lucide-react';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');
  
  // Destructure global state from Context
  const { cartItems, userInfo, logout } = useCart();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Sync state with URL parameters to keep UI in sync with the search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setKeyword(params.get('keyword') || '');
    setCategory(params.get('category') || 'All');
  }, [location.search]);

  const categories = [
  'All',
  'Electronics',
  'Gaming',
  'Fashion',
  'Books',
  'Sports',
  'Fitness',
  'Beauty',
  'Furniture',
  'Office',
  'Toys',
  'Grocery',
  'Automotive',
];


  const handleSearch = (e) => {
    e.preventDefault();
    // Search resets category to All for broad results
    navigate(`/?keyword=${keyword}&category=All`);
  };

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setCategory(selectedCat);
    // Keep search term but filter by new category
    navigate(`/?keyword=${keyword}&category=${selectedCat}`);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-amazon_blue text-white sticky top-0 z-50 shadow-md">
      {/* Top Navigation Row */}
      <div className="max-w-7xl mx-auto flex items-center p-2 gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center border border-transparent hover:border-white px-2 py-1 duration-150">
          <span className="text-2xl font-bold tracking-tight">Ecommerce<span className="text-amazon_yellow"> Platform</span></span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-grow h-10 bg-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amazon_yellow transition-all">
          <select 
            value={category}
            onChange={handleCategoryChange}
            className="bg-gray-100 text-black text-xs px-3 border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-200"
          >
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow p-2 text-black outline-none text-sm px-4" 
            placeholder="Search products..." 
          />
          <button type="submit" className="bg-amazon_yellow p-2 px-5 text-black hover:bg-[#f0c14b] transition-colors">
            <Search size={20} />
          </button>
        </form>

        {/* Right Side Links */}
        <div className="flex items-center gap-2">
          
          {/* Safe Dynamic Account Section */}
          <div className="group relative border border-transparent hover:border-white px-2 py-1 cursor-pointer transition-all">
            <p className="text-[10px] leading-tight text-gray-300">
              {/* Optional chaining fixes the 'split' error */}
              Hello, {userInfo?.name ? userInfo.name.split(' ')[0] : 'Guest'}
            </p>
            <p className="text-sm font-bold leading-tight flex items-center">
              Account & Lists
            </p>

            {/* Hover Dropdown Menu */}
            <div className="absolute hidden group-hover:block top-full right-0 bg-white text-black min-w-[180px] shadow-2xl border rounded-sm py-3 z-50">
              {!userInfo ? (
                <div className="px-4 py-2 text-center">
                  <Link to="/login" className="amazon-button block text-center text-xs mb-3 font-bold py-2">Sign In</Link>
                  <p className="text-[10px] text-gray-600">New customer? <Link to="/register" className="text-blue-600 hover:underline hover:text-orange-600">Start here.</Link></p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="px-4 pb-2 text-xs font-bold border-b mb-2">Your Account</p>
                  <Link to="/orders" className="block px-4 py-1.5 text-xs hover:bg-gray-100 hover:text-orange-700 transition-colors">Orders History</Link>
                  <Link to="/wishlist" className="block px-4 py-1.5 text-xs hover:bg-gray-100 hover:text-orange-700 transition-colors">Wishlist</Link>
                  <hr className="my-2 border-gray-100" />
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-4 py-1.5 text-xs hover:bg-gray-100 flex items-center gap-2 text-red-600 font-medium"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Orders Link */}
          <Link to="/orders" className="hidden md:block border border-transparent hover:border-white px-2 py-1 cursor-pointer duration-150">
            <p className="text-[10px] leading-tight text-gray-300">Returns</p>
            <p className="text-sm font-bold leading-tight">& Orders</p>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative flex items-center border border-transparent hover:border-white px-2 py-2 duration-150">
            <div className="relative">
              <ShoppingCart size={32} />
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-amazon_blue text-amazon_yellow rounded-full text-xs font-bold px-1 min-w-[18px] text-center">
                {cartCount}
              </span>
            </div>
            <span className="ml-1 font-bold self-end text-sm mb-1 hidden sm:block">Cart</span>
          </Link>
        </div>
      </div>
      
      
    </header>
  );
};

export default Header;