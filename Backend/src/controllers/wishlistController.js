import User from '../models/User.js';

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    let wishlistArray = JSON.parse(user.wishlist || '[]');

    const index = wishlistArray.findIndex((id) => id.toString() === productId.toString());

    if (index !== -1) {
      wishlistArray.splice(index, 1); 
    } else {
      wishlistArray.push(productId); 
    }

    user.wishlist = JSON.stringify(wishlistArray);
    await user.save();

    res.status(200).json(wishlistArray);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};