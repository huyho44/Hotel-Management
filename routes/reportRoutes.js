const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// In index.js the route was /api/service-staff-performance which is slightly inconsistent 
// but we'll mount it under /reports or keep it as /api/service-staff-performance. 
// We can mount this one directly in app.js or put it under reports.
// Let's call it /performance and we'll mount it under /api/service-staff-performance in app.js
// Wait, index.js lines:
// app.get("/api/service-staff-performance", ...) -> reportController.getServiceStaffPerformance
// app.get("/reports/customer-spending", ...) -> reportController.getCustomerSpending
// app.get("/reports/branch-revenue", ...) -> reportController.getBranchRevenue

router.get('/customer-spending', reportController.getCustomerSpending);
router.get('/branch-revenue', reportController.getBranchRevenue);

module.exports = router;
