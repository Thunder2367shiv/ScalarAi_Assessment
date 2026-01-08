import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // In Sequelize, findByPk is used for Primary Key lookup
      // 'attributes' with 'exclude' is the equivalent of .select('-password')
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }

      // Convert the Sequelize instance to a plain object so it's easier to use later
      req.user = user.get({ plain: true });
      
      return next();
    } catch (error) {
      console.error('JWT Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};