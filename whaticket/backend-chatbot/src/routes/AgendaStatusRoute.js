const express = require('express');
const router = express.Router();

const AgendaStatusController = require('../controllers/AgendaController');

router.get('/list', AgendaStatusController.list);
router.post('/create', AgendaStatusController.create);
router.get('/get/:id', AgendaStatusController.get);
router.post('/update/:id', AgendaStatusController.update);
router.post('/delete', AgendaStatusController.delete);

module.exports = router;