const express = require('express');
const router = express.Router();

const ProtocoloController = require('../controllers/ProtocoloController');

router.get('/list', ProtocoloController.list);
router.post('/create', ProtocoloController.create);
router.get('/get/:id', ProtocoloController.get);
router.post('/update/:id', ProtocoloController.update);
router.post('/delete', ProtocoloController.delete);

module.exports = router;