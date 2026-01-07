import User from '../models/User.js';

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.wishlist) {
      user.wishlist = [];
    }

    const index = user.wishlist.findIndex(
      (id) => id.toString() === productId
    );

    if (index !== -1) {
      user.wishlist.splice(index, 1); 
    } else {
      user.wishlist.push(productId); 
    }

    await user.save();

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error('WISHLIST ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
