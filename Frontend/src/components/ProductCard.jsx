import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const { addToCart, userInfo, wishlist, setWishlist } = useCart();
  const navigate = useNavigate();

  // Check if item is already in wishlist
  const isWishlisted = wishlist?.some((id) => id === product.id);

  const handleAddToCart = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      addToCart(product);
    }
  };

const toggleWishlist = async (e) => {
  e.preventDefault();
  
  // 1. Safety check: If no userInfo, the user isn't logged in
  if (!userInfo || !userInfo.token) {
    alert("Please login to add items to your wishlist");
    return navigate('/login');
  }

  try {
    // 2. The token MUST be sent as 'Bearer <token>'
    const config = {
      headers: { 
        Authorization: `Bearer ${userInfo.token}` 
      },
    };

    console.log("Config", config);

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/wishlist`, { productId: product.id }, config);
    setWishlist(data); 
    
  } catch (err) {
    // If it still fails, check if the token has expired
    console.log(err.response);
    console.log(err.response.status)
    if (err.response && err.response.status === 401) {
       alert("Session expired. Please login again.");
       navigate('/login');
    }
    console.error("Wishlist error", err);
  }
};
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-sm flex flex-col hover:shadow-md transition-shadow h-full">
      
      <Link to={`/product/${product.id}`} className="flex-grow">
        <div className="h-48 w-full flex items-center justify-center mb-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain" 
            crossOrigin="anonymous"
          />
        </div>
        
        <h2 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 hover:text-orange-700">
          {product.name}
        </h2>

        <div className="flex items-center mb-1">
          <span className="text-yellow-500 text-xs">★★★★☆</span>
          <span className="text-blue-600 text-xs ml-1 font-medium">{product.numReviews}</span>
        </div>

        <div className="flex items-baseline mb-1">
          <span className="text-xs font-bold align-top mt-1">$</span>
          <span className="text-xl font-bold">{product.price}</span>
        </div>

        {product.countInStock > 0 ? (
          <p className="text-[10px] text-green-700 font-medium italic">In Stock ({product.countInStock} left)</p>
        ) : (
          <p className="text-[10px] text-red-600 font-bold">Currently Unavailable</p>
        )}
      </Link>

      {/* --- Action Buttons Container --- */}
      <div className="mt-3 space-y-2">
        
        {/* ADD TO CART BUTTON */}
        <button 
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className={`w-full text-sm py-2 rounded-md border shadow-sm transition-all font-medium ${
            product.countInStock > 0 
            ? 'bg-gradient-to-b from-[#f7dfa1] to-[#f0c14b] border-[#a88734] text-black hover:from-[#f5d172] active:scale-95' 
            : 'bg-gray-200 cursor-not-allowed text-gray-500 border-gray-300'
          }`}
        >
          {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* ADD TO WISHLIST BUTTON (BELOW CART) */}
        <button 
          onClick={toggleWishlist}
          className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-medium active:scale-95"
        >
          <Heart 
            size={14} 
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
          {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
        </button>

      </div>
    </div>
  );
};

export default ProductCard;