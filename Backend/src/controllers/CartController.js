import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: "guest-session-123" });
  res.json(cart || { cartItems: [] });
};

export const updateCart = async (req, res) => {
  const { cartItems } = req.body;
  
  let cart = await Cart.findOne({ user: "guest-session-123" });

  if (cart) {
    cart.cartItems = cartItems;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } else {
    const newCart = await Cart.create({
      user: "guest-session-123",
      cartItems
    });
    res.status(201).json(newCart);
  }
};