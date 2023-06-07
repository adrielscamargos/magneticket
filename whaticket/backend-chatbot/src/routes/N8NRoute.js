const express = require('express');
const router = express.Router();

const N8NController = require('../controllers/N8NController');

router.get('/list', N8NController.list);
router.post('/create', N8NController.create);
router.get('/get/:id', N8NController.get);
router.post('/update/:id', N8NController.update);
router.post('/delete', N8NController.delete);

module.exports = router;