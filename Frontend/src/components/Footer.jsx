const Footer = () => {
  return (
    <footer className="bg-amazon_blue-light text-white mt-12">
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-4 text-sm font-bold"
      >
        Back to top
      </button>
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-600">
        <div>
          <h4 className="font-bold mb-3">Get to Know Us</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">About Amazon</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Shop with Us</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Your Orders</li>
          </ul>
        </div>
      </div>
      <div className="text-center py-8 text-xs text-gray-400">
        © 1996-2026, Amazon Clone Assignment. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;