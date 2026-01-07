import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// 1. IMPORTANT: Import the ProductCard component
import ProductCard from '../components/ProductCard'; 

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get('keyword') || '';
  const category = queryParams.get('category') || 'All';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?keyword=${keyword}&category=${category}`);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category]);

  if (loading) return <div className="text-center p-10 text-xl">Loading Amazon Products...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        {keyword ? `Results for "${keyword}"` : category !== 'All' ? `${category} Products` : 'Recommended for you'}
      </h2>
      
      {products.length === 0 ? (
        <div className="text-center p-10 text-gray-500">No products found matching your search.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;