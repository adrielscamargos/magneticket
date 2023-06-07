const express = require('express');
const router = express.Router();

const DialogFlowAudioController = require('../controllers/DialogFlowAudioController');

router.get('/list', DialogFlowAudioController.list);
router.post('/create', DialogFlowAudioController.create);
router.get('/get/:id', DialogFlowAudioController.get);
router.post('/update/:id', DialogFlowAudioController.update);
router.post('/delete', DialogFlowAudioController.delete);

module.exports = router;