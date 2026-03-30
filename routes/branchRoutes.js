const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

router.get('/', branchController.getAllBranches);

module.exports = router;
