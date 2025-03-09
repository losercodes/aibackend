const express = require('express');
const {
  getChatHistory,
  getChat,
  sendMessage,
  deleteChat
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

const router = express.Router();

// All chat routes are protected
router.use(auth);

router.get('/history', getChatHistory);
router.get('/:id', getChat);
router.post('/', sendMessage);
router.delete('/:id', deleteChat);

module.exports = router;