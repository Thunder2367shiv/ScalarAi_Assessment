import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen flex flex-col md:flex-row gap-6">
      <div className="flex-grow bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-medium border-b pb-4 mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/" className="text-blue-600 hover:underline">Go shopping</Link></p>
        ) : (
          cartItems.map((item) => (
            <div key={item.product} className="flex gap-4 border-b py-4">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-contain" />
              <div className="flex-grow">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-green-700 text-sm">In Stock</p>
                <div className="flex items-center gap-4 mt-4">
                  <select 
                    value={item.qty} 
                    onChange={(e) => addToCart(item, Number(e.target.value) - item.qty)}
                    className="border rounded p-1 bg-gray-100"
                  >
                    {[...Array(10).keys()].map(x => <option key={x+1}>{x+1}</option>)}
                  </select>
                  <button onClick={() => removeFromCart(item.product)} className="text-blue-600 text-sm hover:underline">Delete</button>
                </div>
              </div>
              <p className="font-bold text-xl">${item.price}</p>
            </div>
          ))
        )}
      </div>

      <div className="w-full md:w-80 bg-white p-6 shadow-sm h-fit">
        <h3 className="text-lg mb-4">
          Subtotal ({cartItems.reduce((acc, i) => acc + i.qty, 0)} items): 
          <span className="font-bold ml-1">${subtotal.toFixed(2)}</span>
        </h3>
        <button 
          onClick={() => navigate('/checkout')}
          disabled={cartItems.length === 0}
          className="amazon-button w-full"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;