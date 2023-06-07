const express = require('express');
const router = express.Router();

const AgendamentoController = require('../controllers/AgendamentoController');

router.get('/list', AgendamentoController.list);
router.post('/create', AgendamentoController.create);
router.get('/get/:id', AgendamentoController.get);
router.post('/update/:id', AgendamentoController.update);
router.post('/delete', AgendamentoController.delete);

module.exports = router;