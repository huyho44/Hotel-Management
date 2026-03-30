const express = require('express');
const router = express.Router();
const serviceStaffController = require('../controllers/serviceStaffController');

router.get('/', serviceStaffController.getAllServiceStaffs);
router.post('/', serviceStaffController.createServiceStaff);
router.put('/:id', serviceStaffController.updateServiceStaff);
router.delete('/:id', serviceStaffController.deleteServiceStaff);

module.exports = router;
