const express = require('express');
const router = express.Router();

const TagUserController = require('../controllers/TagUserController');

router.get('/list', TagUserController.list);
router.post('/create', TagUserController.create);
router.get('/get/:id', TagUserController.get);
router.post('/update/:id', TagUserController.update);
router.post('/delete', TagUserController.delete);

module.exports = router;