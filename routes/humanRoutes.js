const express = require('express');
const router = express.Router();
const humanController = require('../controllers/humanController');

router.get('/', humanController.getAllHumans);
router.get('/:id', humanController.getHumanById);
router.post('/', humanController.createHuman);
router.put('/:id', humanController.updateHuman);
router.delete('/:id', humanController.deleteHuman);

module.exports = router;
