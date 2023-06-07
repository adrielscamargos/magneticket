const express = require('express');
const router = express.Router();

const LimiteController = require('../controllers/LimiteController');

router.get('/list', LimiteController.list);
router.post('/create', LimiteController.create);
router.get('/get/:id', LimiteController.get);
router.post('/update/:id', LimiteController.update);
router.post('/delete', LimiteController.delete);

module.exports = router;