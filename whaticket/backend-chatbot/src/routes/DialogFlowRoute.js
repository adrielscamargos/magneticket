const express = require('express');
const router = express.Router();

const DialogFlowController = require('../controllers/DialogFlowController');

router.get('/list', DialogFlowController.list);
router.post('/create', DialogFlowController.create);
router.get('/get/:id', DialogFlowController.get);
router.post('/update/:id', DialogFlowController.update);
router.post('/delete', DialogFlowController.delete);

module.exports = router;