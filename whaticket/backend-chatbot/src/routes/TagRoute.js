const express = require('express');
const router = express.Router();

const TagController = require('../controllers/TagController');

router.get('/list', TagController.list);
router.post('/create', TagController.create);
router.get('/get/:id', TagController.get);
router.post('/update/:id', TagController.update);
router.post('/delete', TagController.delete);

module.exports = router;