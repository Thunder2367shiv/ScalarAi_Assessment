import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ where: { user: "guest-session-123" } });
  if (cart) {
    // Convert text back to JSON array for frontend
    res.json({ ...cart.toJSON(), cartItems: JSON.parse(cart.cartItems) });
  } else {
    res.json({ cartItems: [] });
  }
};

export const updateCart = async (req, res) => {
  const { cartItems } = req.body;
  const itemsString = JSON.stringify(cartItems);
  
  let cart = await Cart.findOne({ where: { user: "guest-session-123" } });

  if (cart) {
    cart.cartItems = itemsString;
    await cart.save();
    res.json({ ...cart.toJSON(), cartItems });
  } else {
    const newCart = await Cart.create({
      user: "guest-session-123",
      cartItems: itemsString
    });
    res.status(201).json({ ...newCart.toJSON(), cartItems });
  }
};