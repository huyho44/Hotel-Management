const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/', managerController.getAllManagers);
router.post('/', managerController.createManager);
router.put('/:id', managerController.updateManager);
router.delete('/:id', managerController.deleteManager);

module.exports = router;
