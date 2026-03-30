const express = require("express");

const humanRoutes = require("./routes/humanRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const managerRoutes = require("./routes/managerRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");
const serviceStaffRoutes = require("./routes/serviceStaffRoutes");
const branchRoutes = require("./routes/branchRoutes");
const reportRoutes = require("./routes/reportRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Mount routes
app.use("/humans", humanRoutes);
app.use("/employees", employeeRoutes);
app.use("/managers", managerRoutes);
app.use("/receptionists", receptionistRoutes);
app.use("/service-staffs", serviceStaffRoutes);
app.use("/branches", branchRoutes);
app.use("/reports", reportRoutes);
app.use("/api/service-staff-performance", apiRoutes); // Special route from index.js mapping

module.exports = app;
