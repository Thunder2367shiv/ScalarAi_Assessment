import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-white border rounded shadow-sm text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="text-green-500 w-16 h-16" />
      </div>
      <h1 className="text-2xl font-bold text-green-700 mb-2">Order Placed, Thank You!</h1>
      <p className="text-gray-600 mb-6">
        Your order has been successfully processed. 
        <br />
        <span className="font-medium text-black">Order ID: {id}</span>
      </p>
      
      <div className="border-t pt-6 flex flex-col items-center gap-4">
        <Link to="/" className="amazon-button w-64">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;