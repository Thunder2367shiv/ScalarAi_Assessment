import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package } from 'lucide-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo) fetchOrders();
  }, [userInfo]);

  if (loading) return <div className="text-center p-20 text-gray-500">Loading your history...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders history</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
          <Package className="mx-auto mb-4 text-gray-300" size={64} />
          <p className="text-xl text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="amazon-button px-6 py-2 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Order Header */}
              <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-wrap justify-between gap-4 text-sm text-gray-700">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Order Placed</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Total</p>
                    <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] uppercase font-bold text-gray-500">Ship To</p>
                    <p className="text-blue-600 hover:underline cursor-pointer font-medium">{userInfo.name}</p>
                  </div>
                </div>
                <div className="text-right ml-auto">
                  <p className="text-[10px] uppercase font-bold text-gray-500">Order # {order._id}</p>
                  
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="flex flex-col gap-6">
                  {order.orderItems.map((item) => (
                    <div key={item.product} className="flex gap-6 items-start">
                      <div className="w-24 h-24 flex-shrink-0 border rounded p-2 bg-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/product/${item.product}`} className="text-blue-600 hover:text-orange-700 font-semibold text-lg line-clamp-2 leading-tight">
                          {item.name}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">Quantity: {item.qty}</p>
                        
                        
                      </div>

                      
                    </div>
                  ))}
                </div>
              </div>

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;