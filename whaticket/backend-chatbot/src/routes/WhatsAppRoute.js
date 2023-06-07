const express = require('express');
const router = express.Router();

const WhatsAppController = require('../controllers/WhatsAppController');

router.get('/list', WhatsAppController.list);
router.post('/create', WhatsAppController.create);
router.get('/get/:id', WhatsAppController.get);
router.post('/update/:id', WhatsAppController.update);
router.post('/delete', WhatsAppController.delete);

module.exports = router;