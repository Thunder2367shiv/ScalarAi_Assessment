import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, wishlist } = useCart();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        setLoading(true);
        
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const filtered = data.filter(p => wishlist?.includes(p.id));
        setItems(filtered);
      } catch (err) {
        console.error("Error fetching wishlist details", err);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchWishlistItems();
  }, [wishlist, userInfo]);

  if (!userInfo) return <div className="p-20 text-center">Please login to view your wishlist.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">Your Wishlist ({items.length})</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">You haven't added anything to your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;