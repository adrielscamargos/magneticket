const express = require('express');
const router = express.Router();

const GruposStatusController = require('../controllers/GruposStatusController');

router.get('/list', GruposStatusController.list);
router.post('/create', GruposStatusController.create);
router.get('/get/:id', GruposStatusController.get);
router.post('/update/:id', GruposStatusController.update);
router.post('/delete', GruposStatusController.delete);

module.exports = router;