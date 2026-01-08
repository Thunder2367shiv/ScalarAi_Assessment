import { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, setCartItems, userInfo } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });

  const totalPrice = cartItems.reduce((acc, i) => acc + i.qty * i.price, 0);

const placeOrderHandler = async () => {
  try {
    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id, 
      })),
      shippingAddress: address,
      totalPrice,
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setCartItems([]);
    navigate(`/order-success/${data._id}`);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Error placing order');
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4 bg-white p-6 border rounded shadow-sm">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <input className="w-full border p-2 rounded" placeholder="Address" onChange={(e) => setAddress({...address, address: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="City" onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Postal Code" onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Country" onChange={(e) => setAddress({...address, country: e.target.value})} />
        </div>

        <div className="bg-gray-50 p-6 border rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span>Items:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-orange-700 mt-4">
            <span>Order Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={placeOrderHandler} className="amazon-button w-full mt-6">Place Your Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;