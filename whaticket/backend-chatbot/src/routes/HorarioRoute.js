const express = require('express');
const router = express.Router();

const HorarioController = require('../controllers/HorarioController');

router.get('/list', HorarioController.list);
router.post('/create', HorarioController.create);
router.get('/get/:id', HorarioController.get);
router.post('/update/:id', HorarioController.update);
router.post('/delete', HorarioController.delete);

module.exports = router;