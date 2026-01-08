import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  countInStock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

export default Product;