import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: DataTypes.STRING,
    defaultValue: "guest-session-123",
    unique: true,
  },
  cartItems: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '[]',
  },
}, {
  timestamps: true,
});

export default Cart;