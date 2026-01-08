import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Use TEXT for compatibility with older MySQL versions
  orderItems: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paidAt: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: true,
});

export default Order;