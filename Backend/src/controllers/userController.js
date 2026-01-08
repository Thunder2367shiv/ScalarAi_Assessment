import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ id: user.id, name: user.name, token: generateToken(user.id) });
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (user && (await user.matchPassword(password))) {
    res.json({ id: user.id, name: user.name, token: generateToken(user.id) });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};