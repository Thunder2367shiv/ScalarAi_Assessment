import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Check stock
    for (const item of orderItems) {
      const product = await Product.findByPk(item.product);
      if (!product || product.countInStock < item.qty) {
        return res.status(400).json({ message: `${item.name} is out of stock` });
      }
    }

    // Create Order
    const order = await Order.create({
      userId: req.user.id, // MySQL uses .id (integer)
      orderItems: JSON.stringify(orderItems),
      shippingAddress: JSON.stringify(shippingAddress),
      totalPrice,
    });

    // Update stock one by one (Sequelize replacement for bulkWrite)
    for (const item of orderItems) {
      const product = await Product.findByPk(item.product);
      await product.decrement('countInStock', { by: item.qty });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('ORDER ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  // Parse JSON strings back into objects for the frontend
  const formattedOrders = orders.map(o => ({
    ...o.toJSON(),
    orderItems: JSON.parse(o.orderItems),
    shippingAddress: JSON.parse(o.shippingAddress)
  }));
  res.json(formattedOrders);
};