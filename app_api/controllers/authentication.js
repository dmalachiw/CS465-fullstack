
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

// Register a new user
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email.trim().toLowerCase();
    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJWT();

    return res.status(201).json({ token });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'This email is already registered.'
      });
    }

    console.error('Registration error:', err);
    return res.status(500).json({
      message: 'Unable to register user.'
    });
  }
};

// Log in an existing user
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: 'Authentication error.'
      });
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Invalid credentials.'
      });
    }

    const token = user.generateJWT();

    return res.status(200).json({ token });
  })(req, res);
};

module.exports = {
  register,
  login
};
