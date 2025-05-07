const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/authValidation');

// controllers/authController.js

exports.register = async (req, res) => {
  console.log('Registration request received'); // Debugging log
  console.log('Registration request received'); // Debugging log

  const { error } = registerValidation(req.body);
  if (error) {
    console.log('Validation Error:', error.details[0].message); // Debug log for validation error
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    console.log('Email already exists'); // Debugging log
    return res.status(400).json({ error: 'Email already exists' });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });

  try {
    const savedUser = await user.save();
    console.log('User saved:', savedUser); // Log the saved user data
    res.status(201).json({ user: savedUser._id });
  } catch (err) {
    console.error('Error during registration:', err); // Log any errors
    res.status(400).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Email not found' });

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ error: 'Invalid password' });

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.header('auth-token', token).json({ token });
};