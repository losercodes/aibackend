const express = require('express');
const {
  register,
  login,
  getMe,
  updateTheme,
  logout
} = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/theme', auth, updateTheme);
router.get('/logout', auth, logout);

module.exports = router;