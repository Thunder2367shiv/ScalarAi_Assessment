import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.countInStock < item.qty) {
        return res.status(400).json({
          message: `${item.name} is out of stock`,
        });
      }
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    const bulkOps = orderItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { countInStock: -item.qty } },
      },
    }));

    await Product.bulkWrite(bulkOps);

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('ORDER ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};
