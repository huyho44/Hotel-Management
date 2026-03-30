const express = require('express');
const router = express.Router();
const receptionistController = require('../controllers/receptionistController');

router.get('/', receptionistController.getAllReceptionists);
router.post('/', receptionistController.createReceptionist);
router.put('/:id', receptionistController.updateReceptionist);
router.delete('/:id', receptionistController.deleteReceptionist);

module.exports = router;
