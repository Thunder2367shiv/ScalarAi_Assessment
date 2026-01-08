import { Op } from 'sequelize';
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;
    let whereClause = {};

    if (keyword && keyword.trim() !== "") {
      whereClause.name = { [Op.like]: `%${keyword}%` };
    }

    if (category && category !== 'All') {
      whereClause.category = category;
    }

    const products = await Product.findAll({ where: whereClause });
    res.json(products || []);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};