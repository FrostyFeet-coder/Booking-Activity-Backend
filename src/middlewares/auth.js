const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];  // Extract token after "Bearer "

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Store user info from token in req.user
    next();  // Move to the next middleware/route
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;
