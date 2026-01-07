import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Left: Image */}
      <div className="md:col-span-5 flex justify-center bg-white p-4 border rounded">
        <img src={product.image} alt={product.name} className="max-h-[500px] object-contain" />
      </div>

      {/* Middle: Info */}
      <div className="md:col-span-4">
        <h1 className="text-2xl font-medium border-b pb-2 mb-2">{product.name}</h1>
        <p className="text-sm text-gray-600 mb-4 italic">{product.brand}</p>
        <div className="border-b pb-4 mb-4">
          <span className="text-sm align-top">$</span>
          <span className="text-3xl font-semibold">{Math.floor(product.price)}</span>
          <span className="text-sm align-top">{(product.price % 1).toFixed(2).substring(1)}</span>
        </div>
        <h3 className="font-bold mb-2">About this item:</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Right: Buy Box */}
      <div className="md:col-span-3 border p-4 rounded-lg bg-gray-50 h-fit">
        <p className="text-2xl font-bold mb-4">${product.price}</p>
        <p className={product.countInStock > 0 ? "text-green-700 font-bold" : "text-red-600 font-bold"}>
          {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        
        {product.countInStock > 0 && (
          <div className="mt-4">
            <label className="block text-sm">Quantity:</label>
            <select 
              value={qty} 
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full border p-1 rounded bg-gray-100 mb-4"
            >
              {[...Array(product.countInStock).keys()].map(x => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              ))}
            </select>
            <button 
              onClick={() => addToCart(product, qty)}
              className="amazon-button w-full mb-2"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => { addToCart(product, qty); navigate('/cart'); }}
              className="w-full bg-orange-400 hover:bg-orange-500 py-2 rounded-md border border-orange-600"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;