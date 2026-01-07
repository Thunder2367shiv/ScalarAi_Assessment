import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    let query = {};

    if (keyword && keyword.trim() !== "") {
      query.name = { $regex: keyword, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const products = await Product.find(query);
    
    res.json(products || []);
    
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};