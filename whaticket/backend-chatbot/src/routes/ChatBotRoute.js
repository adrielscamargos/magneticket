const express = require('express');
const router = express.Router();

const ChatBotController = require('../controllers/ChatBotController');

router.get('/list', ChatBotController.list);
router.post('/create', ChatBotController.create);
router.get('/get/:id', ChatBotController.get);
router.post('/update/:id', ChatBotController.update);
router.post('/delete', ChatBotController.delete);

module.exports = router;